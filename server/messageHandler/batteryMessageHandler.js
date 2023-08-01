const batteryModel = require('../models/batteryModel');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');


// battery status from MQTT broker
const handleBattery = (io) => async (droneIdentifier, encryptedMessage) => { //higher-order function
    try {
        // process the message to determine which drone's battery is low
        // const batteryLevel = message.batteryLevel;
        const { batteryLevel } = encryptedMessage;


        console.log('Encrypted battery data: ' + batteryLevel); //ca74ca2f55cbe7f92789a704ff686c2f
        // console.log('Type of batteryLevel:', typeof batteryLevel);

        //decrypt data
        let decryptedBattery = decryptMessage(batteryLevel);

        // convert decrypted batteryLevel to number
        decryptedBattery  = parseInt(decryptedBattery, 10);

        // Validate the data
        if (typeof decryptedBattery  !== 'number') {
            throw new Error('Invalid battery data');
        }

        //create new battery data
        const newBattery = new batteryModel({
            droneIdentifier,
            batteryLevel: decryptedBattery ,
        });

        //store to db
        await newBattery.save();


        //update battery status in real-time on the webpage
        io.emit('batteryUpdate', { droneIdentifier, batteryLevel: decryptedBattery  });

        // Emit a notification event when the battery is getting low
        if (decryptedBattery <= 20) {
            io.emit('notificationEvent', {
                droneIdentifier,
                batteryLevel: decryptedBattery,
                message: `${droneIdentifier}'s battery level is getting low at ${decryptedBattery}%`,
            });
        }
        console.log("battery level:" + newBattery);
    } catch (err) {
        console.error(`Error updating battery level for ${droneIdentifier}:`, err);
    }
};


module.exports = {
    handleBattery
};
