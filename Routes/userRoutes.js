// useRoutes.js

const express = require('express');

const router = express.Router();
const userController = require('./../controllers/userController.js');
const authController = require('./../controllers/authController.js');

router.post('/signup', authController.signup);
router.post('/login', authController.login);


router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.setNewUser);
router
  .route('/:id')
  .get(userController.getSpecificUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
