const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
        droneIdentifier: {type: String, required: true, unique: true},
        videoUrl: {type: String, require: true}
    },
    {timestamps: true}
);

const videoModel = mongoose.model('video', videoSchema);
module.exports = videoModel;