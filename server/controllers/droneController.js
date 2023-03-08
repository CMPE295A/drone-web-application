const Drone = require("../Models/DroneModel");


//get data from server to client
const getStatus = async (req, res) => {

    try {
        const drones = await Drone.find();
        console.log(drones);


        res.json(drones);
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');

    }
};

//get data from microcontroller to mongoDB
// Create a new drone
const createDrone = async (req, res) => {
    const {name} = req.body;
    console.log(name); // log the data received from the microcontroller
    const drone = new Drone({name, status: 'idle'});
    try {
        const savedDrone = await drone.save();
        //create
        res.status(201).json(savedDrone);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error creating drone'});
    }
};

// Update the status of a drone
const updateStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const updatedDrone = await Drone.findByIdAndUpdate(
            id,
            {$set: {status}},
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


module.exports = {
    getStatus,
    createDrone,
    updateStatus
};
