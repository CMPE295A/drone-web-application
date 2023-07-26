const express = require("express");
const router = express.Router();

const {
    getBattery,
    getBatteryHistory
} = require('../controllers/batteryController');

router.get('/:droneIdentifier', getBattery);
router.get('/history/:droneIdentifier', getBatteryHistory);
module.exports = router;