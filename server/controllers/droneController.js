const Drone = require("../models/DroneModel");
const mqttClient = require('../mqtt/droneMQTT');

//responsible for handling HTTP requests/responses for the web client

//get data from server to client
const getStatus = async (req, res) => {
    try {
        const drones = await Drone.find();
        console.log(drones);
        if (!drones) {
            res.status(404).json({message: "Drones not found"});
        }
        res.json(drones);
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Error finding drones'});

    }
};

//create drone and save to mongoDB, publish to the broker
const registerDrone = async (req, res) => {
    console.log(req.body);

    try {
        const {droneIdentifier, status} = req.body;
        const drone = new Drone({droneIdentifier, status});

        const savedDrone = await drone.save();
        const topic = `drone/${droneIdentifier}/new`;
        // publish message to MQTT broker that a new drone has been registered
        mqttClient.publish(topic, JSON.stringify({
            droneIdentifier: droneIdentifier
        }));

        res.status(201).json(savedDrone);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error registering drone'});
    }
};

// Update name drone
const updateDroneIdentifier = async (req, res) => {
    const {id} = req.params;
    const {droneIdentifier} = req.body.droneIdentifier;
    try {
        const updatedDrone = await Drone.findByIdAndUpdate(
            id,
            {$set: {droneIdentifier}},
            {new: true},
        );
        if (!updatedDrone) {
            return res.status(404).json({message: 'Drone not found'});
        }
        res.json(updatedDrone);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error updating drone status'});
    }
};

//MQTT
//controls drone (UI -> server -> broker -> drone)
const sendCommand = async (req, res) => {
    const droneIdentifier = req.params.droneIdentifier;
    const command = req.body.command;
    try {
        if (!droneIdentifier) {
            res.status(404).json({message: "droneIdentifier not found"});
        }
        // Send the command to the drone using the MQTT protocol
        const topic = `drone/${droneIdentifier}/command`;
        const payload = JSON.stringify({command});
        mqttClient.publish(topic, payload);

        res.status(200).send({
            message: 'Command sent successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error sending drone command'});
    }
};


module.exports = {
    getStatus,
    registerDrone,
    updateDroneIdentifier,
    sendCommand
};
