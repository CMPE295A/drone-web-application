const express = require("express");
const router = express.Router();

const {
    getAccelerometer
} = require('../controllers/accelerometerController');

router.get('/:droneIdentifier', getAccelerometer);
module.exports = router;