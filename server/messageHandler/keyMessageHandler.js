const crypto = require('crypto');
const fs = require('fs');

const generateKeyPair = async () => {

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

    console.log('Public key: ', publicKeyHex);
    console.log('Private key: ', privateKeyHex);

    // console.log('Buffer Public key: ', publicKey);
    // console.log('Buffer Private key: ', privateKey);

    //ignore 04 prefix (indicates the key is in uncompressed form) 
    const rawPublicKey = publicKey.slice(1);
    const rawPublicKeyHex = rawPublicKey.toString('hex');
    console.log('Raw Public key: ', rawPublicKeyHex);

    // Write keys to pem files
    fs.writeFileSync('publicKey.pem', publicKeyHex);
    fs.writeFileSync('privateKey.pem', privateKeyHex);


}


//get shared secret from MCU
const getSecretKey = async (secret) => {
    try {
        //store secret key to .pem file
        fs.writeFileSync('secretKey.pem', secret);
    } catch (err) {
        console.error('Error storing the secret key:', err);
    }
}


//generate the shared secret using mcu public key and server's private key
const generateSharedSecret = async (publicKey) => { //public key is hex
    // elliptic curve diffie-hellman
    const ecdh = crypto.createECDH('secp256k1');

    // Load server's private key
    const privateKeyHex = fs.readFileSync('./privateKey.pem', 'utf-8');
    ecdh.setPrivateKey(privateKeyHex, 'hex'); //set private key for ecdh

    // Convert mcu public key back to Buffer
    // const mcuPublicKey = Buffer.from('04' + publicKey, 'hex');  //prepend 0x04 if deleted
    const mcuPublicKey = Buffer.from(publicKey, 'hex');


    // Generate the shared secret
    const sharedSecret = ecdh.computeSecret(mcuPublicKey); //https://nodejs.org/api/crypto.html#diffiehellmancomputesecretotherpublickey-inputencoding-outputencoding

    // Convert the shared secret to hex
    const sharedSecretHex = sharedSecret.toString('hex');

    console.log('Shared Secret in hex: ', sharedSecretHex);
    console.log('Shared Secret in buffer: ', sharedSecret);

    // write shared secret to a file
    // fs.writeFileSync('sharedSecret.pem', sharedSecretHex); //shared secret in hex
    fs.writeFileSync('sharedSecret.pem', sharedSecret); //in buffer format
}
module.exports = {
    generateKeyPair,
    getSecretKey,
    generateSharedSecret
}