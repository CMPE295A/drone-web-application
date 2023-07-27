const crypto = require('crypto');

const generateKeyPair = () => {

    //elliptic curve diffie-hellman
    const ecdh = crypto.createECDH('secp256k1'); //https://nodejs.org/api/crypto.html#cryptocreateecdhcurvename
    // Generate a new key pair
    ecdh.generateKeys();

    //get generated public key
    const publicKey = ecdh.getPublicKey();
    //get generated private key
    const privateKey = ecdh.getPrivateKey();

    console.log('Public key: ', publicKey.toString('base64'));
    console.log('Private key: ', privateKey.toString('base64'));
}

module.exports = { generateKeyPair }