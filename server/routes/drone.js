const express = require("express");
const router = express.Router();

const {getStatus, createDrone, updateStatus} = require("../controllers/droneController");

//server to client
router.get("/status", getStatus)

//microcontroller to server
router.post("create", createDrone)
router.put("/update", updateStatus)

module.exports = router;