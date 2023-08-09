const crypto = require('crypto');
const fs = require('fs');

const generateKeyPair = async () => {
    // check if keys already exist in the server
    if (fs.existsSync('publicKey.pem') && fs.existsSync('privateKey.pem')) {
        console.log('Keys already exist');
        return;
    } //else generate new ones

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
    fs.writeFileSync('publicKey.pem', rawPublicKeyHex);
    fs.writeFileSync('privateKey.pem', privateKeyHex);


}


//get shared secret from MCU
const getSecretKey = async (secret) => {
    try {
        // // Check if secret key already exists
        // if (fs.existsSync('secretKey.pem')) {
        //     return;
        // }

        //store secret key to .pem file
        fs.writeFileSync('secretKey.pem', secret);
    } catch (err) {
        console.error('Error storing the secret key:', err);
    }
}


//generate the shared secret using mcu public key and server's private key
const generateSharedSecret = async (publicKey) => { //public key is hex
    // check if shared secret already exists in the server
    // if (fs.existsSync('sharedSecret.pem')) {
    //     console.log('Shared secret already exists');
    //     return;
    // } //else generate new one


    // elliptic curve diffie-hellman
    const ecdh = crypto.createECDH('secp256k1');

    // Load server's private key
    const privateKeyHex = fs.readFileSync('./privateKey.pem', 'utf-8');
    ecdh.setPrivateKey(privateKeyHex, 'hex'); //set private key for ecdh

    // Convert mcu public key back to Buffer
    const mcuPublicKey = Buffer.from('04' + publicKey, 'hex');  //prepend 0x04 if deleted
    // const mcuPublicKey = Buffer.from(publicKey, 'hex');


    // Generate the shared secret
    const sharedSecret = ecdh.computeSecret(mcuPublicKey); //https://nodejs.org/api/crypto.html#diffiehellmancomputesecretotherpublickey-inputencoding-outputencoding

    // Convert the shared secret to hex
    const sharedSecretHex = sharedSecret.toString('hex');

    console.log('Shared Secret in hex: ', sharedSecretHex);
    console.log('Shared Secret in buffer: ', sharedSecret);

    // write shared secret to a file
    // fs.writeFileSync('sharedSecret.pem', sharedSecretHex); //shared secret in hex
    fs.writeFileSync('sharedSecret.pem', sharedSecret); //in buffer format
    console.log('Shared secret generated');
}

//for testing shared secret generation
const testSharedSecret = async (publicKey, privateKey) => { //public key is hex

    // elliptic curve diffie-hellman
    const ecdh = crypto.createECDH('secp256k1');

    // Load server's private key
    ecdh.setPrivateKey(privateKey, 'hex'); //set private key for ecdh

    // Convert mcu public key back to Buffer
    // const mcuPublicKey = Buffer.from('04' + publicKey, 'hex');  //prepend 0x04 if deleted
    const mcuPublicKey = Buffer.from(publicKey, 'hex');

    // Generate the shared secret
    const sharedSecret = ecdh.computeSecret(mcuPublicKey);


    // Convert the shared secret to hex
    const sharedSecretHex = sharedSecret.toString('hex');

    console.log('Shared Secret in hex: ', sharedSecretHex);
    console.log('Shared Secret in buffer: ', sharedSecret);

    // return the shared secret
    return sharedSecret;


}
module.exports = {
    generateKeyPair,
    getSecretKey,
    generateSharedSecret,
    testSharedSecret
}