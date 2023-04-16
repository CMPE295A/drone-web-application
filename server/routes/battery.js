const express = require("express");
const router = express.Router();

const {
    getBattery
} = require('../controllers/batteryController');

router.get('/:droneIdentifier', getBattery);
module.exports = router;