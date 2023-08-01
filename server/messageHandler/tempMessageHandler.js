const temperatureModel = require('../models/temperatureModel');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

// temperature status from MQTT broker
const handleTemperature = (io) => async (droneIdentifier, encryptedMessage) => { //higher-order function
    try {
        // process the temperature message 
        const { temperature } = encryptedMessage;

        console.log('Encrypted temperature data: ' + temperature); //ca74ca2f55cbe7f92789a704ff686c2f

        //decrypt data
        let decryptedTemperature = decryptMessage(temperature);

        // convert decrypted temperature to number
        decryptedTemperature = parseFloat(decryptedTemperature);

        // Validate the data
        if (typeof decryptedTemperature !== 'number') {
            throw new Error('Invalid temperature data');
        }

        //create new temperature data
        const newTemperature = new temperatureModel({
            droneIdentifier,
            temperature: decryptedTemperature,
        });

        //store to db
        await newTemperature.save();

        console.log("temperature level:" + newTemperature);

        // send a temperature update event to the client via socket.io
        io.emit('temperatureUpdate', { droneIdentifier, temperature: decryptedTemperature });

        // Emit a notification event if the temperature is over the threshold
        if (decryptedTemperature > 37) {
            io.emit('notificationEvent', {
                droneIdentifier,
                temperature: decryptedTemperature,
                message: `${droneIdentifier}'s temperature is high at ${decryptedTemperature} °C`,
            });
        }
    } catch (err) {
        console.error(`Error updating temperature level for ${droneIdentifier}:`, err);
    }
};
module.exports = { handleTemperature };