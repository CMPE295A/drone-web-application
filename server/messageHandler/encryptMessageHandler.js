const crypto = require('crypto');
const fs = require('fs');

// To encrypt data
const encryptMessage = (message) => {
    // console.log("random32: " + crypto.randomBytes(32));

    const algorithm = 'aes-256-cbc';
    const iv = 'abcdefghijklmnop'; // 16 bytes long required

    // const secretKey = crypto.randomBytes(32); // generate key for testing
    // const secretKeyHex = secretKey.toString('hex');
    // fs.writeFileSync('secretKey.pem', secretKey);
    // console.log(secretKeyHex);


    // Load secret key
    // const secretKey = fs.readFileSync('./secretKey.pem', 'utf-8'); //mcu generated
    // const secretKey = fs.readFileSync('./sharedSecret.pem', 'utf-8'); //server generated in hex string
    const secretKey = fs.readFileSync('./sharedSecret.pem'); //server generated in buffer

    // const secretKeyHex = Buffer.from(secretKey, 'hex'); //convert hex to Buffer if getting hex 

    //not used, just for reading
    const secretKeyHex = secretKey.toString('hex'); //convert Buffer to hex string (to be readable)

    console.log('shared secret in buffer format: ' + secretKey);
    console.log('shared secret in hex format: ' + secretKeyHex);



    //secret key must be in Buffer format
    let cipher = crypto.createCipheriv(algorithm, secretKey, iv); //https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options
    let encrypted = cipher.update(message, 'utf8'); //can't be hex

    // Return any remaining encrypted data
    encrypted = Buffer.concat([encrypted, cipher.final()]); // Encrypted message 
    console.log('encrypted data: ' + encrypted); //output in buffer format
    console.log('encrypted data in hex: ', encrypted.toString('hex'));

    // return encrypted;
    return encrypted.toString('hex');
}

module.exports = {
    encryptMessage
}
