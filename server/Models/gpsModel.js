const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpsSchema = new Schema({
        droneIdentifier: {type: String, required: true, unique: true},
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        altitude: {
            type: Number,
            required: true,
        },
    }, {timestamps: true}
);

const gpsModel = mongoose.model('GPS', gpsSchema);
module.exports = gpsModel;
