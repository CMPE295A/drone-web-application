const GPS = require("../Models/gpsModel");

const getLocation = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    console.log(droneId);

    try {
        if (!droneId) {
            res.status(404).json({message: "droneIdentifier not found"});
        }
        const location = await GPS.findOne({droneIdentifier: droneId}).sort({ timestamp: -1 }); //should we update or create new document?
        // const location = await GPS.find({droneIdentifier: droneId}); //return all documents with droneId

        console.log(location);
        if (!location) {
            res.status(404).json({message: "Location not found"});
        }
        res.json(location);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {
    getLocation
}