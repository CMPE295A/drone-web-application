const crypto = require('crypto');
const fs = require('fs');

// To encrypt data
const encryptMessage = (message) => {
    // console.log("random32: " + crypto.randomBytes(32));

    const algorithm = 'aes-256-cbc';
    const iv = 'abcdefghijklmnop'; // 16 bytes long required
    // Load secret key
    const secretKey = fs.readFileSync('./secretKey.pem', 'utf-8');
    // const secretKey = crypto.randomBytes(32);
    // const secretKeyHex = secretKey.toString('hex');
    // fs.writeFileSync('secretKey.pem', secretKey);

    console.log('secret: ' + secretKey);
    // console.log(secretKeyHex);
    const secretKey1 = Buffer.from(secretKey, 'hex'); //convert hex to binary


    //secret key must be in binary format
    let cipher = crypto.createCipheriv(algorithm, secretKey1, iv); //https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options
    let encrypted = cipher.update(message, 'utf8'); //can't be hex

    // Return any remaining encrypted data
    encrypted = Buffer.concat([encrypted, cipher.final()]); // Encrypted message 
    // console.log('encrypted data: ' + encrypted);
    console.log('encrypted data: ', encrypted.toString('hex'));

    return encrypted;
}

module.exports = {
    encryptMessage
}
// // test
// const encryptedMessage = encryptMessage('Hello, world!');
// console.log(encryptedMessage);