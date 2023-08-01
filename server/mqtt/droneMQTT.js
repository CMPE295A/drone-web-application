const mqtt = require('mqtt'); //API for creating an MQTT client
const { handleStatus } = require('../messageHandler/droneMessageHandler');
const { handleGPS } = require('../messageHandler/gpsMessageHandler');
const { handleBattery } = require("../messageHandler/batteryMessageHandler");
const { handleVideo } = require("../messageHandler/videoMessageHandler");
const { handleTemperature } = require('../messageHandler/tempMessageHandler');
const { getSecretKey } = require('../messageHandler/keyMessageHandler');
// const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

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
const serverPublicKey = fs.readFileSync('./publicKey.pem', 'utf8'); // in hex string

const sharedSecret = fs.readFileSync('./sharedSecret.pem'); //in buffer


// let sharedSecretKey;  // store shared secret in-memory?

//set up the MQTT client with a Socket.IO server object as a parameter
const mqttClient = (io) => { //inject dependency 'io' object from index.js

    //initialize message handler functions with 'io' instance for real-time updates
    const addBattery = handleBattery(io);
    const addGPS = handleGPS(io);
    const addTemperature = handleTemperature(io);
    const addStatus = handleStatus(io);


    // Connect to the AWS IoT broker using MQTT
    const client = mqtt.connect({
        host: endpoint,
        port: 8883,
        protocol: 'mqtts', // secure TLS communication
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
        client.subscribe('drone/+/temperature');
        client.subscribe('drone/+/video'); //TODO

        //keys from mcu
        client.subscribe('mcu/secretKey');
        client.subscribe('mcu/publicKey');
        // client.subscribe('server/publicKey'); //for testing

        // publish the server's public key to MCU
        // const payload = JSON.stringify({ publicKey: serverPublicKey }); //convert to JSON, not feasable for mcu?
        client.publish('server/publicKey', serverPublicKey, { retain: true }, () => { // 'server/publicKey' topic
            console.log("server's public key is published");
            // client.end(); // Close the connection when published
        });
        client.publish('server/secretKey', sharedSecret, { retain: true }, () => { // shared secret from server
            console.log("server generated shared secret is published");
        });

    });

    //message handling
    client.on('message', async (topic, message) => {
        console.log('received message:', message.toString());
        //retrieve droneIdentifier and topic name
        const [_, droneIdentifier, topicName] = topic.split('/'); //drone/{droneIdentifier}/{topicName}

        try {
            const payload = JSON.parse(message.toString()); //convert JSON to object
            console.log('Parsed payload:', payload);
            // const payload = message;


            //update drone status
            if (topicName === 'status') {

                //decrypt drone's status, display real-time updates
                await addStatus(droneIdentifier, payload);
            }
            //update gps info
            else if (topicName === 'gps') {

                //decrypt and store gps data, display real-time updates
                await addGPS(droneIdentifier, payload);
            }
            //update battery status
            else if (topicName === 'battery') {

                //decrypt and store battery data, display real-time updates
                await addBattery(droneIdentifier, payload);
            }
            //update temperature status
            else if (topicName === 'temperature') {

                //decrypt and store temperature data, display real-time update
                await addTemperature(droneIdentifier, payload);
            }

            //store the secret key from MCU for decryption
            else if (topic === 'mcu/secretKey') {
                console.log(payload.message);
                await getSecretKey(payload.message);
            }
            //generate shared secret using mcu public key; stored in file
            else if (topic === 'mcu/publicKey') {
                console.log(payload.message);
                await generateSharedSecret(payload.message);
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
