const accelerometerModel = require('../models/accelerometerModel');
const { decryptMessage } = require('./decryptMessageHandler');


// accelerometer status from MQTT broker
const handleAccelerometer = (io) => async (droneIdentifier, encryptedMessage) => { //higher-order function
    try {
        // // process the drone's accelerometer message (individually encrypted)
        // const { horizontal, vertical, lateral } = encryptedMessage;

        //nested JSON object encrypted
        //348426857b487d10ccb749108238dc8014d3b054f194c7d2a9ec46a4cca4cf47a020db3fbad51c42b56fae0d2dc11b846728a7b83206aaa7bd8f13e79b5de058

        console.log('Encrypted accelerometer data: ' + encryptedMessage); //ca74ca2f55cbe7f92789a704ff686c2f

        // //if decrypt individual data
        // let decryptedHorizontal = decryptMessage(horizontal);
        // let decryptedVertical = decryptMessage(vertical);
        // let decryptedLateral = decryptMessage(lateral);

        //if decrypt entire nested JSON object. Convert to JS object
        const decryptedAccelerometer = JSON.parse(decryptMessage(encryptedMessage));
        let { horizontal: decryptedHorizontal, vertical: decryptedVertical, lateral: decryptedLateral } = decryptedAccelerometer;
        // console.log(typeof decryptedAccelerometer);

        // convert decrypted accelerometer to float
        decryptedHorizontal = parseFloat(decryptedHorizontal);
        decryptedVertical = parseFloat(decryptedVertical);
        decryptedLateral = parseFloat(decryptedLateral);


        // Validate the data
        if (typeof decryptedHorizontal !== 'number' || typeof decryptedVertical !== 'number' || typeof decryptedLateral !== 'number') {
            throw new Error('Invalid accelerometer data');
        }

        //create new accelerometer data
        const newAccelerometer = new accelerometerModel({
            droneIdentifier,
            horizontal: decryptedHorizontal,
            vertical: decryptedVertical,
            lateral: decryptedLateral
        });

        //store to db
        await newAccelerometer.save();


        //update accelerometer status in real-time on the webpage
        io.emit('accelerometerUpdate', {
            droneIdentifier,
            horizontal: decryptedHorizontal,
            vertical: decryptedVertical,
            lateral: decryptedLateral
        });


        console.log("accelerometer:" + newAccelerometer);
    } catch (err) {
        console.error(`Error updating accelerometer level for ${droneIdentifier}:`, err);
    }
};


module.exports = {
    handleAccelerometer
};
