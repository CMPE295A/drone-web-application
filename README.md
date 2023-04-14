## How to run 
1. git clone repo
2. cd server
3. npm install
4. create .env file in server folder
5. Add MONGODB_URL= < your mongodb > to .env file <br> 
  or use mine: MONGODB_URL=mongodb+srv://ajDroneDB:5HSmZCo759tuFTCF@drone.l9ts6iz.mongodb.net/?retryWrites=true&w=majority
6. nodemon index.js
7. cd client
8. npm install
9. npm start


## How to connect to AWS IoT core
1. Create an AWS IoT thing (Manage -> All Devices -> Things)
    - Auto-generate certificate / use existing one / skip
2. Create an AWS IoT policy (Security -> Policies -> Create a policy)
    - Add statement (allow, action, resource)
        - Resource: arn:aws:iot: REGION: Account ID:*
        - Ex: arn:aws:iot:us-west-2:123456789:*
3. Create an AWS IoT certificate (Security -> Certificates -> Add Certificate)
    - Download the certificate and keys
    - Attach policy to certificate if you haven't
4. Configure the MQTT client in your code using the Host endpoint and port along with your certificate and keys
5. Test using subscribe/publish to a topic on AWS IoT MQTT test client


