const express = require("express");
const router = express.Router();

const {
    regenerateKeys,
    getPublicKey
} = require('../controllers/keyGenerationController');

router.post('/regenerate', regenerateKeys);
router.get('/publicKey', getPublicKey);
module.exports = router;