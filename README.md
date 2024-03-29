# Drone Web Application

## Table of Contents
- [How to run locally](#how-to-run-locally)
- [How to run app using Docker images from DockerHub](#how-to-run-app-using-docker-images-from-dockerhub)
- [How to run using Docker compose](#how-to-run-using-docker-compose)
- [How to sign in as IAM user to the AWS Management Console](#how-to-sign-in-as-iam-user-to-the-aws-management-console)
- [How to connect to AWS IoT core](#how-to-connect-to-aws-iot-core)
- [System Architecture](#system-architecture)

## How to run locally
1. Clone the repository:
 ```shell
git clone https://github.com/CMPE295A/drone-web-application
 ```
2. Install dependencies in the client and server directory:
```shell
cd client
npm install
cd server
npm install
```
3. Setup the environment variables:
- Create a `.env` file in the server directory:
    - `MONGODB_URL` = ... 
    - `JWT_SECRET` = ... 
    - `AWS_CERTIFICATE_PATH` = ... 
    - `AWS_PRIVATE_KEY_PATH` = ... 
    - `AWS_IOT_HOST_ENDPOINT` = ... 
- Create a .env file in the client directory:
    - `REACT_APP_GOOGLE_MAP_API_KEY` = ... 
4. Run the client & server in separate terminals:
```shell
cd client && npm start
cd server && nodemon index.js
```
5. Navigate to http://localhost:4000 in your browser.

## How to run app using Docker images from DockerHub
1. Install Docker: https://docs.docker.com/get-docker/
2. Pull server & client Docker images
```shell
docker pull aj09/drone-nodejs
docker pull aj09/drone-react
```
3. Run the Docker images in seperate terminals
```shell
docker run -p 3000:3000 aj09/drone-nodejs
docker run -p 4000:80 aj09/drone-react
```
4. Navigate to http://localhost:4000 in your browser.


## How to run using Docker compose
1. Install Docker & Docker-Compose: https://docs.docker.com/get-docker/ & https://docs.docker.com/compose/install/
2. Clone the repository: git clone https://github.com/CMPE295A/drone-web-application
3. Open terminal and navigate to the project root directory. Ex: cd ~/Desktop/drone-web-application
4. To start the containers: docker-compose up
5. To stop the containers: docker-compose down


## How to sign in as IAM user to the AWS Management Console
1. Go to https://820446012843.signin.aws.amazon.com/console
2. Enter 'drone' as username and the provided password
3. Under the 'Services' or search bar, look for "IoT Core"
4. Go to MQTT test client to test pub/sub topics

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

## System Architecture
![System Architecture](https://github.com/CMPE295A/drone-web-application/assets/54551895/0481b6fa-4155-4f4f-9965-f95fa4f28bdd)
