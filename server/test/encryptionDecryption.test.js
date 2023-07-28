const chai = require('chai');
const { expect } = chai;
const { decryptMessage } = require('../messageHandler/decryptMessageHandler');
const { encryptMessage } = require('../messageHandler/encryptMessageHandler');

describe('Encryption and Decryption Integration Test', () => {

    it('should encrypt and then decrypt back to the original message', function () {
        const originalMessage = 'Hello, World!';
        console.log('Original message: ' + originalMessage);
        const encryptedMessage = encryptMessage(originalMessage); //encrypt the message in buffer
        const decryptedMessage = decryptMessage(encryptedMessage); // test decrypt

        // check if the message is encrypted
        expect(encryptedMessage).to.not.equal(originalMessage);
        // check if the encrypted message is a Buffer object
        expect(Buffer.isBuffer(encryptedMessage)).to.be.true;
        // check if the decrypted message is a string
        expect(decryptedMessage).to.be.a('string');
        // check if the decrypted message is equal to the original message
        expect(decryptedMessage).to.equal(originalMessage);

    });


});
