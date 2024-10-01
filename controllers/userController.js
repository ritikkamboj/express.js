const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: users.length,
    data: {
      users: users,
    },
  });
  res.status(500).json({
    status: 'error',
    message: 'Route is yet to define',
  });
});
exports.setNewUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is yet to define',
  });
};
exports.getSpecificUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is yet to define',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is yet to define',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is yet to define',
  });
};
