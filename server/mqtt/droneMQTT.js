const mqtt = require('mqtt'); //API for creating an MQTT client
const {handleStatus} = require('../messageHandler/droneMessageHandler');
const {handleGPS} = require('../messageHandler/gpsMessageHandler');
const {handleBattery} = require("../messageHandler/batteryMessageHandler");
const {handleVideo} = require("../messageHandler/videoMessageHandler");

const client = mqtt.connect('mqtt://localhost:1883');

//connect to broker (network that receives messages and sends to subscribers)
client.on('connect', () => {
    console.log('Connected to MQTT broker');


    // client.subscribe('test');

    //subscribe to the topics
    //+ wildcard for specific drone id
    //drone/{droneIdentifier}/{topicName}
    // client.subscribe('drone/+/register');
    client.subscribe('drone/+/status');
    client.subscribe('drone/+/gps');
    client.subscribe('drone/+/battery');
    client.subscribe('drone/+/video');


});

// publish a message to the 'test' topic
// // publish a message to the 'test' topic
//     client.publish('test', 'Hello, MQTT!', function() {
//         console.log('Message published');
//         // client.end(); // close connection to broker
//     });


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
            await handleBattery(droneIdentifier, payload);
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

module.exports = client;
