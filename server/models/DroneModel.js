const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const droneSchema = new Schema({
    droneIdentifier: { type: String, required: true, unique: true },
    status: {
        type: String, required: true,
        enum: ['idle', 'flying', 'offline'],
        default: 'idle'
    },
    // gps: [gpsSchema],   // array of GPS locations
    targetLocation: {
        longitude: { type: Number },
        latitude: { type: Number }
    },
},
    { timestamps: true }
);


const DroneModel = mongoose.model('Drone', droneSchema);
module.exports = DroneModel;
