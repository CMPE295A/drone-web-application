const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const droneSchema = new Schema({
        droneIdentifier: {type: String, required: true, unique: true},
        status: {
            type: String, required: true,
            enum: ['idle', 'flying'],
            default: 'idle'
        },
        gps: {
            type: Schema.Types.ObjectId,
            ref: 'GPS',
        },
    },
    {timestamps: true}
);


const DroneModel = mongoose.model('Drone', droneSchema);
module.exports = DroneModel;
