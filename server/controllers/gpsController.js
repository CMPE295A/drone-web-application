const GPS = require("../models/gpsModel");
const { encryptMessage } = require('../messageHandler/encryptMessageHandler');
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');

//import mqtt client
const client = require('../mqtt/mqttClient');


const getLocation = async (req, res) => {

    const droneId = req.params.droneIdentifier;
    console.log(droneId);

    try {
        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }
        const location = await GPS.findOne({ droneIdentifier: droneId }).sort({ timestamp: -1 }); //should we update or create new document?
        // const location = await GPS.find({droneIdentifier: droneId}); //return all documents with droneId

        console.log(location);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};


//set up drone flight on react, publish to AWS IoT code
const addFlight = async (req, res) => {
    const droneId = req.params.droneIdentifier;
    console.log(droneId);

    // console.log(client);
    try {
        const { latitude, longitude } = req.body;
        console.log(req.body);

        // convert latitude and longitude into a JSON string
        const coordinates = JSON.stringify({ latitude, longitude });
        console.log(coordinates);

        //encrypt data
        const encryptedData = encryptMessage(coordinates);

        //decrypt for testing
        decryptMessage(encryptedData)

        if (!droneId) {
            return res.status(404).json({ message: "droneIdentifier not found" });
        }

        //publish encrypted data to topic 'drone/drone1/flight'
        client.publish(`drone/${droneId}/flight`, encryptedData);

        res.json({ message: 'Coordinates published' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error setting up drone flight' });
    }
};



module.exports = {
    getLocation,
    addFlight
}