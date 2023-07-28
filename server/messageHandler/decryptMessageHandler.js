const crypto = require('crypto');
const fs = require('fs');

// to decrypt data
const decryptMessage = (encryptedMessage) => {
    const algorithm = 'aes-256-cbc'
    const iv = 'abcdefghijklmnop'; // 16 bytes long required
    //load secret key
    const secretKey = fs.readFileSync('./secretKey.pem', 'utf-8');
    const secretKey1 = Buffer.from(secretKey, 'hex'); //convert hex to binary


    //secret must be in binary format
    let decipher = crypto.createDecipheriv(algorithm, secretKey1, iv); //https://nodejs.org/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8'); //input buffer, output utf8

    //return any remaining decrypted data
    decrypted += decipher.final('utf8');


    console.log(decrypted);
    return decrypted;
}

module.exports = {
    decryptMessage
}