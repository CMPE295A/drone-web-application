const DroneModel = require('../models/DroneModel');

//handles MQTT messages received from the broker
const handleStatus = async (droneIdentifier, message) => {
    try {

        const {status} = message;

        // update drone status in the database
        const drone = await DroneModel.findOneAndUpdate(
            {droneIdentifier},
            {$set: {status: status}},
            {new: true}
        );
        if (!drone) {
            throw new Error(`Drone identifier: ${droneIdentifier} not found`);
        }

        console.log("status: " + drone);
    } catch (err) {
        console.error(`Error updating drone status for ${droneIdentifier}:`, err);
    }
};

module.exports = {
    handleStatus,
};
