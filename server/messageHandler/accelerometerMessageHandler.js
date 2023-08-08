const accelerometerModel = require('../models/accelerometerModel');
const { decryptMessage } = require('./decryptMessageHandler');


// accelerometer status from MQTT broker
const handleAccelerometer = (io) => async (droneIdentifier, encryptedMessage) => { //higher-order function
    try {
        // process the drone's accelerometer message
        const { horizontal, vertical, lateral } = encryptedMessage;


        console.log('Encrypted accelerometer data: ' + encryptedMessage); //ca74ca2f55cbe7f92789a704ff686c2f

        //decrypt data
        let decryptedHorizontal = decryptMessage(horizontal);
        let decryptedVertical = decryptMessage(vertical);
        let decryptedLateral = decryptMessage(lateral);


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
