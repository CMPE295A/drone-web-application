const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    droneIdentifier: { type: String, required: true },
    temperature: {
        type: Number,
        require: true
    }

},
    { timestamps: true }
);

const temperatureModel = mongoose.model('temperature', temperatureSchema);
module.exports = temperatureModel;