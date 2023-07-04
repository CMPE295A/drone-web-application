require('dotenv').config();
const express = require('express'); //express module
const app = express(); // create an express app

//create a Socket.IO server for websocket and attach to http server
const http = require('http').Server(app); //create http server
const io = require('socket.io')(http, {
    //handle websocket connection
    cors: {
        // origin: [process.env.frontendURL, "http://localhost:4000"],
        origin: "*"
    }
});

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors({
    //handle http API request
    // origin: [process.env.frontendURL, "http://localhost:4000"],
    // credentials: true
    origin: "*"
}));


app.use(express.urlencoded({ extended: true })); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format.

const port = 3000;

//MQTT client starts when the web application starts
require('./mqtt/droneMQTT')(io); //pass 'io' object to the MQTT client module using dependency injection

// const mqttClient = require('./mqtt/mqttClient');
// const mqttClient = require('./mqtt/droneMQTT');






//connect to mongoDB
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');

//Connection pooling to improve the performance and scalability
// reuse connection to db
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100, // max connections in the pool
};

mongoose.connect(mongoDB, options, (err) => {
    if (err) {
        console.log(err);
        console.log('MongoDB Connection Failed');
        process.exit(1); // Exits with a failure code
    } else {
        console.log('MongoDB Connected');
    }
});


//handles the http requests
const droneRoute = require("./routes/drone");
const userRoute = require("./routes/user");
const gpsRoute = require("./routes/gps");
const batteryRoute = require("./routes/battery");
const temperatureRoute = require("./routes/temperature");


app.use('/drone', droneRoute);
app.use('/user', userRoute);
app.use('/gps', gpsRoute);
app.use('/battery', batteryRoute);
app.use('/temperature', temperatureRoute);


// Handle WebSocket connections
io.on('connection', function (socket) {
    console.log('Websocket connected');

    socket.on('disconnect', function () {
        console.log('Websocket disconnected');
    });
});

//start the HTTP server for both Express app and Socket.IO server
http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

