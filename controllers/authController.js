//authController.js

const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = catchAsync(async (req, res, next) => {
    // below line makes any user declare itself as admin , to stop thart we have to change the line as :
    // const newUser = await User.create(req.body);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //  1. checking that if email and password exist 
    if (!email || !password) {
        return next(new AppError('Please Provide the email and password', 400))
    }
    // 2. check that if the user exist and password is correct
    const user = await User.findOne({ email: email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
        return next(new AppError('In correct email or passowrd ', 401));

    }

    console.log(user, 'jai');


    //3 . if all things are ok then we can send a token 
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token
    });


});

exports.protect = catchAsync(async (req, res, next) => {

    // 1. Getting the token and check if it exist 
    // console.log('yaha tak aaya ');

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

    }

    console.log('token' + token);

    if (!token) {

        return next(new AppError('You are not logged in', 401));

    }

    // 2. validate the token 

    // 3.check if user still exists

    // 4. check if user chc=ange password afte the token was issue 

    next();
})