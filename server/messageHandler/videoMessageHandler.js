const videoModel = require('../models/videoModel');

//update later
//handles video data from broker
const handleVideo = async (droneIdentifier, message) => {
    try {
        const {url} = message;

        // Validate the data
        if (!url) {
            throw new Error('Invalid url');
        }


        // Update data for the specified drone
        const updatedVideo  = await videoModel.findOneAndUpdate(
            {droneIdentifier}, // find droneIdentifier
            {url},
            {new: true, upsert: true} // update if document exists, create a new one if not
        );

        console.log('video data updated:', updatedVideo);
    } catch (err) {
        console.error(`Error updating video data for ${droneIdentifier}:`, err);
    }
};

module.exports = {handleVideo};
