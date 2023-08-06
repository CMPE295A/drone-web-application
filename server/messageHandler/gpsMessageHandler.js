const GPS = require('../models/gpsModel');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

//handles gps data from broker
const handleGPS = (io) => async (droneIdentifier, encryptedMessage) => {//higher-order function
    try {
        // const { latitude, longitude } = encryptedMessage;
        const { latitude, longitude, altitude, speed } = encryptedMessage;
        console.log('Encrypted {latitude, longitude}: ' + latitude + ', ' + longitude);
        console.log('Encrypted {altitude, speed}: ' + altitude + ', ' + speed);


        //decrypt data
        let decryptedLatitude = decryptMessage(latitude);  //e896ed046369845cc3c50e8571cd7e8c
        let decryptedLongitude = decryptMessage(longitude);  //10f4678d15f185427e2911791d751b8f

        let decryptedAltitude = decryptMessage(altitude);
        let decryptedSpeed = decryptMessage(speed);

        // convert decrypted data back into numbers
        decryptedLatitude = parseFloat(decryptedLatitude);
        decryptedLongitude = parseFloat(decryptedLongitude);

        decryptedAltitude = parseFloat(decryptedAltitude);
        decryptedSpeed = parseFloat(decryptedSpeed);

        // // Validate the data
        // if (!latitude || !longitude || !altitude) {
        //     throw new Error('Invalid location payload');
        // }


        // Update the GPS data for the specified drone
        const updatedGPSData = await GPS.findOneAndUpdate(
            { droneIdentifier }, // find droneIdentifier
            {   // Update the GPS fields
                latitude: decryptedLatitude,
                longitude: decryptedLongitude,
                altitude: decryptedAltitude,
                speed: decryptedSpeed
            },
            { new: true, upsert: true } // update if document exists, create a new one if not
        );

        // io.emit('locationUpdate', { droneIdentifier, latitude: decryptedLatitude, longitude: decryptedLongitude });
        io.emit('gpsUpdate', {
            droneIdentifier,
            latitude: decryptedLatitude,
            longitude: decryptedLongitude,
            altitude: decryptedAltitude,
            speed: decryptedSpeed
        });

        console.log('GPS data updated:', updatedGPSData);
    } catch (err) {
        console.error(`Error updating GPS data for ${droneIdentifier}:`, err);
    }
};

module.exports = { handleGPS };
