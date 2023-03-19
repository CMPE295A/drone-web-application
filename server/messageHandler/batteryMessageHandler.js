const batteryModel = require('../models/batteryModel');


// battery status from MQTT broker
const handleBattery = async (droneIdentifier, message) => {
    try {
        // process the message to determine which drone's battery is low
        const batteryLevel = message;

        // // Validate the data
        if (typeof batteryLevel !== 'number') {
            throw new Error('Invalid battery payload');
        }
        //
        // take appropriate actions based on the battery level
        const battery = await batteryModel.findOneAndUpdate(
            {droneIdentifier},
            {$set: {batteryLevel: batteryLevel}},
            {new: true}
        );

        console.log("battery level:" + battery);
    } catch (err) {
        console.error(`Error updating battery level for ${droneIdentifier}:`, err);
    }
};


module.exports = {
    handleBattery
};
