const GPS = require('../Models/gpsModel');

//handles gps data from broker
const handleGPS = async (droneIdentifier, message) => {
    try {
        const {latitude, longitude, altitude} = message;

        // Validate the data
        if (!latitude || !longitude || !altitude) {
            throw new Error('Invalid location payload');
        }


        // Update the GPS data for the specified drone
        const updatedGPSData = await GPS.findOneAndUpdate(
            {droneIdentifier}, // find droneIdentifier
            {latitude, longitude, altitude}, // Update the GPS fields
            {new: true, upsert: true} // update if document exists, create a new one if not
        );

        console.log('GPS data updated:', updatedGPSData);
    } catch (err) {
        console.error(`Error updating GPS data for ${droneIdentifier}:`, err);
    }
};

module.exports = {handleGPS};
