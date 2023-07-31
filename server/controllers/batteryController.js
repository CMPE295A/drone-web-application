const batteryModel = require("../models/batteryModel"); //M and m conflict error from models


//display currrent status of battery
const getBattery = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    // console.log(droneId);

    try {
        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }
        const battery = await batteryModel.findOne({ droneIdentifier: droneId }).sort({ updatedAt: -1 });

        // console.log(battery);
        if (battery.length === 0) {
            return res.status(404).json({ message: "battery level not found" });
        }
        res.json(battery);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}


//display the history of the drone's battery for anaylytic
const getBatteryHistory = async (req, res) => {
    const droneId = req.params.droneIdentifier;
    const limit = parseInt(req.query.limit) || 20; //default last 20
    try {
        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }
        const batteryHistory = await batteryModel.find({ droneIdentifier: droneId })
            .sort({ timestamp: -1 })
            .limit(limit);
        if (batteryHistory.length === 0) {
            return res.status(404).json({ message: "battery history not found" });
        }
        res.json(batteryHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getBattery,
    getBatteryHistory
}