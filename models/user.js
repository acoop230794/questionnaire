const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    // time: {
    //     type: Number,
    //     required: true
    // }

});

module.exports = mongoose.model('users', user);