const chai = require('chai');
const { expect } = chai;
const { testSharedSecret } = require('../messageHandler/keyMessageHandler');

describe('Shared Secret Generation Test', () => {
    it('should generate a shared secret given the MCU public key & server private key', async () => {
        const MCUpublicKeyHex = '041ebde72699eb046423784bd9f329a59ab485555dd83d45c7dc0c51928d159ac7f21e21d6b598e1e1e1719943b793f7f76886fb78f87879c32b2bce64309237ff';
        const privateKeyHex = 'efc93803bd60c2be2a864409a289373126cc6554fa1f6c01f096dbf98b810abf';

        //generate the shared secret
        const sharedSecret = await testSharedSecret(MCUpublicKeyHex, privateKeyHex); 

        // Check if sharedSecret is a Buffer
        expect(Buffer.isBuffer(sharedSecret)).to.be.true;
    });
});
