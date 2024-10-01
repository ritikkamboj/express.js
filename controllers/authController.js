//authController.js

const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

exports.signup = catchAsync(async (req, res, next) => {
    // below line makes any user declare itself as admin , to stop thart we have to change the line as :
    // const newUser = await User.create(req.body);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});


exports.login = (req, res, next) => {
    const { email, password } = req.body;
    //  1. checking that if email and password exist 
    if (!email || !password) {
        return next(new AppError('Please Provide the email and password', 400))
    }
    // 2. check that if the user exist and password is correct
    const user = User.findOne({ enail: email });

    //3 . if all things are ok then we can send a token 
    const token = '';

    res.status(200).json({
        status: 'success',
        token
    });


};

