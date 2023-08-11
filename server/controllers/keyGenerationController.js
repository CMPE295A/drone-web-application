const { generateKeyPair } = require('../messageHandler/keyMessageHandler');
const fs = require('fs');

//import mqtt client
const client = require('../mqtt/mqttClient');

//regenerate key pairs, publish public key to MCU 
//which subsequently receives MCU public key and regenerate the shared secret
const regenerateKeys = async (req, res) => {


    try {
        const newPublicKey = await generateKeyPair(); //returns buffer
        const newPublicKeyHex = newPublicKey.toString('hex');
        const rawPublicKeyAscii = newPublicKey.toString('ascii');
        const publicKeyBase64 = newPublicKey.toString('base64');

        client.publish('server/publicKey', newPublicKeyHex, { retain: true }, (err) => {
            if (err) {
                console.error('Error publishing the public key:', err);
                res.status(500).json({ message: 'Error publishing the public key.' });
                return;
            }

            console.log("server's regenerated public key is published");
            //return success
            res.status(200).json({
                message: 'Keys regenerated and public key published successfully.',
                publicKey: newPublicKeyHex
            });


        });



    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error setting regenerating keys' });
    }

}

//GET request for public key
const getPublicKey = (req, res) => {
    try {
        const publicKey = fs.readFileSync('publicKey.pem'); //buffer if regenerated
        const publicKeyHex = publicKey.toString('hex');

        // console.log(publicKey);
        // console.log(publicKeyHex);
        res.status(200).json({ publicKey: publicKeyHex });
    } catch (err) {
        console.error('Error reading the public key:', err);
        res.status(500).json({ message: 'Error retrieving the public key.' });
    }
};


module.exports = {
    regenerateKeys,
    getPublicKey
}