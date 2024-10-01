const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name , email , photo, password , passowrdConfirm

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name ']

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
        minLength: 8,
        select: false

    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Provide a password '],

        validate: {
            // this only works on CREATE and  SAVE !!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passowrds are not same '
        }


    }
});

userSchema.pre('save', async function (next) {
    //only runs if the password is modified 
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
