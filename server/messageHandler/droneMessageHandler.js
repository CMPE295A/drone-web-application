const DroneModel = require('../models/DroneModel');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');


//handles drone status ['idle', 'flying', 'offline'],
const handleStatus = (io) => async (droneIdentifier, encryptedMessage) => { //higher-order function

    try {
        const { status } = encryptedMessage;

        console.log('Encrypted status: ' + status);

        //flying
        //c0f958353c5af040db056247f4d7dd9f

        // offline 
        // 134ccb987713cbc8b5c346b8d2205d35


        //decrypt data
        let decryptedStatus = decryptMessage(status);

        // update drone status 
        const drone = await DroneModel.findOneAndUpdate(
            { droneIdentifier },
            { $set: { status: decryptedStatus } },
            { new: true, upsert: true } //if no document, create one (update/insert)
        );

        console.log("status: " + drone);

        // send a status update event to the client via socket.io
        io.emit('statusUpdate', { droneIdentifier, status: decryptedStatus });


    } catch (err) {
        console.error(`Error updating drone status for ${droneIdentifier}:`, err);
    }
};

module.exports = {
    handleStatus,
};
