const express = require("express");
const router = express.Router();

const {
    getLocation,
    addFlight
} = require('../controllers/gpsController');

router.get('/:droneIdentifier', getLocation);
router.post('/:droneIdentifier', addFlight);
module.exports = router;