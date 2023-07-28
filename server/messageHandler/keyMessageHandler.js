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

    // // Convert keys to hex
    const publicKeyHex = publicKey.toString('hex');
    const privateKeyHex = privateKey.toString('hex');

    // console.log('Public key: ', publicKeyHex);
    // console.log('Private key: ', privateKeyHex);

    console.log('Buffer Public key: ', publicKey);
    console.log('Buffer Private key: ', privateKey);


    // Write keys to pem files
    fs.writeFileSync('publicKey.pem', publicKeyHex);
    fs.writeFileSync('privateKey.pem', privateKeyHex);


}


//get secret from MCU
const getSecretKey = (secret) => {
    try {
        //store secret key to .pem file
        fs.writeFileSync('secretKey.pem', secret);
    } catch (err) {
        console.error('Error storing the secret key:', err);
    }
}

module.exports = {
    generateKeyPair,
    getSecretKey
}