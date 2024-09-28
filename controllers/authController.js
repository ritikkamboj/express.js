const User = require('./../models/userModel');

export.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
}