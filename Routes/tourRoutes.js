//tourRoutes.js

const express = require('express');
const tourController = require('./../controllers/tourController.js');
const authController = require('./../controllers/authController.js');
const router = express.Router();

// router.param('id', tourController.checkId); // param middleware

router.route('/top-5-cheaps').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/:id')
  .get(tourController.getSpecificTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.setNewTour);

module.exports = router;
