const mqtt = require('mqtt');

//AWS IoT endpoint
const endpoint = process.env.AWS_IOT_HOST_ENDPOINT;
// AWS IoT certificate and private key
const certificatePath = process.env.AWS_CERTIFICATE_PATH;
const privateKeyPath = process.env.AWS_PRIVATE_KEY_PATH;
// Load the certificate and private key
const fs = require('fs');
const certificate = fs.readFileSync(certificatePath);
const privateKey = fs.readFileSync(privateKeyPath);

//load server's public key
const serverPublicKey = fs.readFileSync('./publicKey.pem', 'utf8'); // in hex string

//handles MQTT client connection to IoT core
const client = mqtt.connect({
    host: endpoint,
    port: 8883,
    protocol: 'mqtts', // secure TLS communication
    cert: certificate,
    key: privateKey,
});

client.on('error', (err) => {
    console.error('AWS IoT Core Connection Failed:', err.message);
    process.exit(1); // Exits with a failure code
});

client.on('connect', () => {
    console.log('Connected to AWS IoT Core broker');

    // publish the server's public key to MCU
    // const serverPublicKeyPayload = JSON.stringify({ publicKey: serverPublicKey }); //convert to JSON
    client.publish('server/publicKey', serverPublicKey, { retain: true }, () => { // 'server/publicKey' topic
        console.log("server's public key is published");
    });

    //publish the shared secret generated from server to MCU if needed
    // client.publish('server/secretKey', sharedSecret, { retain: true }, () => { // shared secret from server
    //     console.log("server generated shared secret is published");
    // });
});

module.exports = client;
