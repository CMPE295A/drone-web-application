const mqtt = require('mqtt'); //API for creating an MQTT client
const { handleStatus } = require('../messageHandler/droneMessageHandler');
const { handleGPS } = require('../messageHandler/gpsMessageHandler');
const { handleBattery } = require("../messageHandler/batteryMessageHandler");
const { handleVideo } = require("../messageHandler/videoMessageHandler");
const { handleTemperature } = require('../messageHandler/tempMessageHandler');
const { getSecretKey } = require('../messageHandler/keyMessageHandler');
// const client = mqtt.connect('mqtt://localhost:1883'); //for mosquitto broker

//AWS IoT endpoint
const endpoint = process.env.AWS_IOT_HOST_ENDPOINT;
// AWS IoT certificate and private key
const certificatePath = process.env.AWS_CERTIFICATE_PATH;
const privateKeyPath = process.env.AWS_PRIVATE_KEY_PATH;
// Load the certificate and private key
const fs = require('fs');
const certificate = fs.readFileSync(certificatePath);
const privateKey = fs.readFileSync(privateKeyPath);

//load server's public key
const serverPublicKey = fs.readFileSync('./publicKey.pem');


//set up the MQTT client with a Socket.IO server object as a parameter
const mqttClient = (io) => { //inject dependency 'io' object from index.js
    // Connect to the AWS IoT broker using MQTT
    const client = mqtt.connect({
        host: endpoint,
        port: 8883,
        protocol: 'mqtts', //secure
        cert: certificate,
        key: privateKey,
    });

    client.on('error', (err) => {
        console.error('AWS IoT Core Connection Failed:', err.message);
        process.exit(1); // Exits with a failure code
    });

    // connect to broker (network that receives messages and sends to subscribers)
    client.on('connect', () => {
        // console.log('Connected to MQTT broker');
        console.log('Connected to AWS IoT Core broker');

        //subscribe to the topics
        //+ wildcard for specific drone id
        //drone/{droneIdentifier}/{topicName}
        // client.subscribe('drone/+/register');
        client.subscribe('drone/+/status');
        client.subscribe('drone/+/gps');
        client.subscribe('drone/+/battery');
        client.subscribe('drone/+/video'); //TODO
        client.subscribe('drone/+/temperature');
        client.subscribe('mcu/secretKey');
        // client.subscribe('server/publicKey'); //for testing

        // publish the server's public key to MCU
        client.publish('server/publicKey', serverPublicKey); //'server/publicKey' topic

    });

    //message handling
    client.on('message', async (topic, message) => {
        console.log('received message:', message.toString());
        //retrieve droneIdentifier and topic name
        const [_, droneIdentifier, topicName] = topic.split('/'); //drone/{droneIdentifier}/{topicName}

        try {
            const payload = JSON.parse(message.toString()); //convert JSON to object

            //update drone status
            if (topicName === 'status') {
                await handleStatus(droneIdentifier, payload);
            }
            //update gps info
            else if (topicName === 'gps') {
                await handleGPS(droneIdentifier, payload);

                //update map location in real time using websocket
                const { latitude, longitude } = payload;
                io.emit('locationUpdate', { droneIdentifier, latitude, longitude });
            }
            //update battery status
            else if (topicName === 'battery') {
                // console.log('Parsed payload:', payload);
                // console.log('Type of batteryLevel:', typeof payload);
                const batteryLevel = payload.batteryLevel;
                await handleBattery(droneIdentifier, payload);
                // console.log(batteryLevel);
                io.emit('batteryUpdate', { droneIdentifier, batteryLevel }); //update battery status in real time

                // Emit a notification event when the battery is getting low
                if (batteryLevel <= 20) {
                    io.emit('notificationEvent', {
                        droneIdentifier,
                        batteryLevel,
                        message: `${droneIdentifier}'s battery level is getting low at ${batteryLevel}%`,
                    });
                }

            }
            //update temperature status
            else if (topicName === 'temperature') {
                // console.log('Parsed payload:', payload);
                const temperature = payload.temperature;
                await handleTemperature(droneIdentifier, payload);
                // console.log(temperature);
                //send real time update to client
                io.emit('temperatureUpdate', { droneIdentifier, temperature }); //update temperature status in real time

                // Emit a notification event if the temperature is over the threshold
                if (temperature > 37) {
                    io.emit('notificationEvent', {
                        droneIdentifier,
                        temperature,
                        message: `${droneIdentifier}'s temperature is high at ${temperature} °C`,
                    });
                }

            }

            //store the secret key from MCU for decryption
            else if (topic === 'mcu/secretKey') {
                console.log(payload.message);
                await getSecretKey(payload.message);
            }

            // //test if public key is published
            // else if (topic === 'server/publicKey') {
            //     console.log('Received message on server/publicKey: ', payload);
            // }


            //update the video data (TODO)
            else if (topicName === 'video') {
                await handleVideo(droneIdentifier, payload);
            } else {
                console.error(`Invalid topic: ${topic}`);
            }

        } catch (err) {
            console.error(`Error processing message for topic "${topicName}" to ${droneIdentifier} :`, err);
        }
    });
}
module.exports = mqttClient;
