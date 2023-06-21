const express = require("express");
const router = express.Router();

const {
    getLocation
} = require('../controllers/gpsController');

router.get('/:droneIdentifier', getLocation);
module.exports = router;