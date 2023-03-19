const express = require("express");
const router = express.Router();

const {
    getStatus,
    registerDrone,
    updateDroneIdentifier,
    sendCommand
} = require("../controllers/droneController");

//server to client
router.get('/status', getStatus)
router.post('/register', registerDrone)
router.put('/update', updateDroneIdentifier)
router.post('/command', sendCommand);

module.exports = router;