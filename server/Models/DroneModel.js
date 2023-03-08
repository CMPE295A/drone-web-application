const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const droneSchema = new Schema({
        name: {type: String, required: true},
        status: {type: String, required: true}
    },
    {timestamps: true}
);


const DroneModel = mongoose.model('Drone', droneSchema);
module.exports = DroneModel;
