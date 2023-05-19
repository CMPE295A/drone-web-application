const mqtt = require('mqtt'); //API for creating an MQTT client
const { handleStatus } = require('../messageHandler/droneMessageHandler');
const { handleGPS } = require('../messageHandler/gpsMessageHandler');
const { handleBattery } = require("../messageHandler/batteryMessageHandler");
const { handleVideo } = require("../messageHandler/videoMessageHandler");

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
        client.subscribe('drone/+/video');
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
            }
            //update battery status
            else if (topicName === 'battery') {
                // console.log('Parsed payload:', payload);
                // console.log('Type of batteryLevel:', typeof payload);
                const batteryLevel = payload.batteryLevel;
                await handleBattery(droneIdentifier, payload);
                // console.log(batteryLevel);
                io.emit('batteryUpdate', { droneIdentifier, batteryLevel }); //update battery status in real time

            }
            //update the video data
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
