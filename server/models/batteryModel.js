const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batterySchema = new Schema({
    droneIdentifier: { type: String, required: true },
    batteryLevel: {
        type: Number,
        require: true
    }

},
    { timestamps: true }
);

const batteryModel = mongoose.model('battery', batterySchema);
module.exports = batteryModel;