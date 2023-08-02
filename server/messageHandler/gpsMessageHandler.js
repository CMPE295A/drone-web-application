const GPS = require('../models/gpsModel');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

//handles gps data from broker
const handleGPS = (io) => async (droneIdentifier, encryptedMessage) => {//higher-order function
    try {
        // const {latitude, longitude, altitude} = message;
        const { latitude, longitude } = encryptedMessage;
        console.log('Encrypted {latitude, longitude}: ' + latitude + ', ' + longitude);


        //decrypt data
        let decryptedLatitude = decryptMessage(latitude);  //e896ed046369845cc3c50e8571cd7e8c
        let decryptedLongitude = decryptMessage(longitude);  //10f4678d15f185427e2911791d751b8f

        // convert decrypted data back into numbers
        decryptedLatitude = parseFloat(decryptedLatitude);
        decryptedLongitude = parseFloat(decryptedLongitude);

        // // Validate the data
        // if (!latitude || !longitude || !altitude) {
        //     throw new Error('Invalid location payload');
        // }


        // Update the GPS data for the specified drone
        const updatedGPSData = await GPS.findOneAndUpdate(
            { droneIdentifier }, // find droneIdentifier
            // {latitude, longitude, altitude}, // Update the GPS fields
            { latitude: decryptedLatitude, longitude: decryptedLongitude }, // Update the GPS fields
            { new: true, upsert: true } // update if document exists, create a new one if not
        );

        io.emit('locationUpdate', { droneIdentifier, latitude: decryptedLatitude, longitude: decryptedLongitude });

        console.log('GPS data updated:', updatedGPSData);
    } catch (err) {
        console.error(`Error updating GPS data for ${droneIdentifier}:`, err);
    }
};

module.exports = { handleGPS };
