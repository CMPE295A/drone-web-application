const temperatureModel = require('../models/temperatureModel');

//fetches drone's temp
const getTemperature = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    // console.log(droneId);

    try {
        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }
        const temperature = await temperatureModel.findOne({ droneIdentifier: droneId }).sort({ timestamp: -1 });

        // console.log(temperature);
        if (!temperature) {
            return res.status(404).json({ message: "temperature level not found" });
        }
        res.json(temperature);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = {
    getTemperature
}