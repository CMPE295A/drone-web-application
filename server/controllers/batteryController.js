const batteryModel = require("../models/batteryModel"); //M and m conflict error from models

const getBattery = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    // console.log(droneId);

    try {
        if (!droneId) {
            res.status(404).json({message: "droneIdentifier not found"});
        }
        const battery = await batteryModel.findOne({droneIdentifier: droneId}).sort({ timestamp: -1 });

        // console.log(battery);
        if (!battery) {
            res.status(404).json({message: "battery level not found"});
        }
        res.json(battery);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {
    getBattery
}