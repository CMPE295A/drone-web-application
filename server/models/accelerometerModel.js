const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accelerometerSchema = new Schema({
    droneIdentifier: { type: String, required: true },
    horizontal: {
        type: Number,
        require: true
    },
    vertical: {
        type: Number,
        require: true
    },
    lateral: {
        type: Number,
        require: true
    }

},
    { timestamps: true }
);

const accelerometerModel = mongoose.model('accelerometer', accelerometerSchema);
module.exports = accelerometerModel;