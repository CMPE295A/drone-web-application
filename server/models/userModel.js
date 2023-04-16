const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {type: String, require: true},
        password: {type: String, require: true},
        // isAdmin: {type: Boolean}
    },
    {timestamps: true})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;