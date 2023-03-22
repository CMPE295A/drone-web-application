const UserModel = require('../Models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../Utils/config");

const signup = async (req, res) => {
    try {
        const {username, password} = req.body;

        //random string added to the password before hashed
        const salt = await bcrypt.genSalt(10);
        //hash password
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            username,
            password: passwordHash,
        });

        const userTaken = UserModel.findOne(username);
        if (userTaken) {
            //conflict
            res.status(409).json({message: "Username is taken"});
            console.log("Username is taken");
        } else {
            const data = await newUser.save();

            const payload = {_id: data._id, username: data.username};
            const token = jwt.sign(payload, secretKey, {
                expiresIn: 1008000,
            });

            res.status(201).json({token});
            console.log("signed up: " + data);

            // res.status(201).json({message: "Signed up"});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }

};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await UserModel.findOne({username});
        if (!user) {
            console.log("no user found");
            res.status(404).json({message: "Invalid Credentials. Wrong username or password"});
            return;
        }

        //hash password, then compare to hashed password in db
        const match = await bcrypt.compare(password, user.password);
        console.log(user.password);
        if (!match) {
            res.status(400).json({message: "Invalid credentials"});
        } else {

            const payload = {_id: user._id, username: user.username};
            const token = jwt.sign(payload, secretKey, {
                expiresIn: 1008000,
            });

            res.status(200).json({token});

            console.log("Successful login");

        }


    } catch (err) {
        res.status(500).json({message: err.message});

    }

};

module.exports = {
    signup,
    login
}