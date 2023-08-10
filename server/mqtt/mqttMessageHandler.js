const { handleStatus } = require('../messageHandler/droneMessageHandler');
const { handleGPS } = require('../messageHandler/gpsMessageHandler');
const { handleBattery } = require("../messageHandler/batteryMessageHandler");
const { handleVideo } = require("../messageHandler/videoMessageHandler");
const { handleTemperature } = require('../messageHandler/tempMessageHandler');
const { handleAccelerometer } = require('../messageHandler/accelerometerMessageHandler');
const { getSecretKey } = require('../messageHandler/keyMessageHandler');
const { generateSharedSecret } = require('../messageHandler/keyMessageHandler');
// const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

const client = require('./mqttClient');


const mqttMessageHandler = (io) => {

    //initialize message handler functions with 'io' instance for real-time updates
    const addBattery = handleBattery(io);
    const addGPS = handleGPS(io);
    const addTemperature = handleTemperature(io);
    const addStatus = handleStatus(io);
    const addAccelerometer = handleAccelerometer(io);


    //subscribe to the topics
    //+ wildcard for specific drone id
    //drone/{droneIdentifier}/{topicName}
    // client.subscribe('drone/+/register');
    client.subscribe('drone/+/status');
    client.subscribe('drone/+/gps');
    client.subscribe('drone/+/battery');
    client.subscribe('drone/+/temperature');
    client.subscribe('drone/+/accelerometer');
    client.subscribe('drone/+/video'); //TODO
    client.subscribe('drone/+/data'); // topic for all data

    //keys from mcu
    client.subscribe('mcu/publicKey');
    // client.subscribe('server/publicKey'); //for testing
    // client.subscribe('mcu/secretKey'); //if MCU is generating the shared secret

    //message handling
    client.on('message', async (topic, message) => {
        console.log('received message:', message.toString());
        //retrieve droneIdentifier and topic name
        const [_, droneIdentifier, topicName] = topic.split('/'); //drone/{droneIdentifier}/{topicName}

        try {
            const payload = JSON.parse(message.toString()); //convert JSON to object
            console.log('Parsed payload:', payload);
            // const payload = message;


            //using a single topic for all drone data
            if (topicName === 'data') {

                const { status, gps, batteryLevel, temperature, accelerometer } = payload;

                if (status) {
                    //decrypt drone's status, display real-time updates on react client
                    await addStatus(droneIdentifier, { status });
                }
                if (gps) {
                    //decrypt and store gps data, display real-time updates on react client
                    await addGPS(droneIdentifier, gps);
                }
                if (batteryLevel) {

                    //decrypt and store battery data, display real-time updates on react client
                    await addBattery(droneIdentifier, { batteryLevel });
                }
                if (temperature) {
                    //decrypt and store temperature data, display real-time update on react client
                    await addTemperature(droneIdentifier, { temperature });
                }

                if (accelerometer) {
                    //decrypt accelerometer, store to db,  display real-time updates on react client
                    await addAccelerometer(droneIdentifier, accelerometer);
                }
            }

            //update drone status
            else if (topicName === 'status') {

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

            //update accelerometer status
            else if (topicName === 'accelerometer') {
                await addAccelerometer(droneIdentifier, payload);
            }

            //store the secret key from MCU for decryption
            else if (topic === 'mcu/secretKey') {
                console.log(payload.message);
                await getSecretKey(payload.message);
            }
            //generate shared secret using mcu public key
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

};

module.exports = mqttMessageHandler;
