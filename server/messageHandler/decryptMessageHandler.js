const crypto = require('crypto');
const fs = require('fs');

// to decrypt data
const decryptMessage = (encryptedMessage) => {
    const algorithm = 'aes-256-cbc'
    const iv = 'abcdefghijklmnop'; // 16 bytes long required
    //load secret key
    const secretKey = fs.readFileSync('./sharedSecret.pem');  // if in buffer
    // const secretKey = fs.readFileSync('./sharedSecret.pem', 'utf-8'); // if in hex string


    // const secretKeyHex = Buffer.from(secretKey, 'hex'); //convert hex to Buffer

    console.log('Decrypt shared secret in buffer format: ' + secretKey);
    // console.log('Decrypt shared secret in hex format: ' + secretKeyHex);

    //secret must be in Buffer format
    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv); //https://nodejs.org/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options
    let decrypted = decipher.update(encryptedMessage, 'utf8'); //input buffer, output utf8
    // let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8'); //input hex, output utf8

    //return any remaining decrypted data
    decrypted += decipher.final('utf8');


    console.log('decrypted data: ' + decrypted);
    return decrypted;
}

module.exports = {
    decryptMessage
}