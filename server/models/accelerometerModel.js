const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accelerometerSchema = new Schema({
    droneIdentifier: { type: String, required: true },
    horizontal: {
        type: Number,
        required: true
    },
    vertical: {
        type: Number,
        required: true
    },
    lateral: {
        type: Number,
        required: true
    }

},
    { timestamps: true }
);

const accelerometerModel = mongoose.model('accelerometer', accelerometerSchema);
module.exports = accelerometerModel;