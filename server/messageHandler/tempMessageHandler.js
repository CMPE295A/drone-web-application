const temperatureModel = require('../models/temperatureModel');

// temperature status from MQTT broker
const handleTemperature = async (droneIdentifier, message) => {
    try {
        // process the temperature message 
        const temperature = message.temperature;

        // Validate the data
        if (typeof temperature !== 'number') {
            throw new Error('Invalid temperature data');
        }

        //update temperature level
        const updatedTemperature = await temperatureModel.findOneAndUpdate(
            { droneIdentifier },
            { $set: { temperature: temperature } },
            { new: true, upsert: true } // update if document exists, create a new one if not
        );

        console.log("temperature level:" + updatedTemperature);
    } catch (err) {
        console.error(`Error updating temperature level for ${droneIdentifier}:`, err);
    }
};
module.exports = { handleTemperature };