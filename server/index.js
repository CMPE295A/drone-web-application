require('dotenv').config();
const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors()); //configure allowed domain/origin
// app.use(cors({origin: process.env.frontendURL, credentials: true}));

app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format.


const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello, world!');
});


//connect to mongoDB
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(mongoDB ,(err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const droneRoute = require("./routes/drone");


app.use("/drone", droneRoute);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

