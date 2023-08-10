const AccelerometerModel = require("../models/accelerometerModel");


//display currrent status of Accelerometer
const getAccelerometer = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    // console.log(droneId);

    try {
        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }
        const accelerometer = await AccelerometerModel.findOne({ droneIdentifier: droneId }).sort({ updatedAt: -1 });

        console.log(accelerometer);
        if (accelerometer.length === 0) {
            return res.status(404).json({ message: "Accelerometer data not found" });
        }
        res.json(accelerometer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}


module.exports = {
    getAccelerometer,
}


