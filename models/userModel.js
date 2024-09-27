const mongoose = require('mongoose');
const validator = require('validator');

//name , email , photo, password , passowrdConfirm

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name '];

    },
    email:
    {
        type: String,
        required: [true, 'Please Provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please Provide a valid email']



    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please Provide a password '],
        minLength: 8

    },
    passwordconfirm: {
        type: String,
        required: [true, 'Please Provide a password '],
        minLength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
