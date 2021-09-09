const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
},{collection:'users', timestamps: true});

const userModel = Mongoose.model('users', UserSchema);

module.exports = userModel;
