const crypto = require('crypto');
const fs = require('fs');

const generateKeyPair = () => {

    //elliptic curve diffie-hellman
    const ecdh = crypto.createECDH('secp256k1'); //https://nodejs.org/api/crypto.html#cryptocreateecdhcurvename
    // Generate a new key pair
    ecdh.generateKeys();

    //get generated public key
    const publicKey = ecdh.getPublicKey();
    //get generated private key
    const privateKey = ecdh.getPrivateKey();

    // Convert keys to base64 strings
    const publicKeyBase64 = publicKey.toString('base64');
    const privateKeyBase64 = privateKey.toString('base64');

    console.log('Public key: ', publicKeyBase64);
    console.log('Private key: ', privateKeyBase64);

    // Write keys to pem files
    fs.writeFileSync('publicKey.pem', publicKeyBase64);
    fs.writeFileSync('privateKey.pem', privateKeyBase64);
}

module.exports = { generateKeyPair }