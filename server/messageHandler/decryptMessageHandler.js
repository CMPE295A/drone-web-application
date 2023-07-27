const crypto = require('crypto');

// to decrypt data
const decryptMessage = (encryptedMessage) => {
    const algorithm = 'aes-256-cbc'
    const iv = 'something'
    //load secret key
    const secretKey = fs.readFileSync('./secretKey.pem');


    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv); //https://nodejs.org/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8'); //input hex, output utf8

    //return any remaining decrypted data
    decrypted += decipher.final('utf8');

    console.log(decrypted);
    return decrypted;
}

module.exports = {
    decryptMessage
}