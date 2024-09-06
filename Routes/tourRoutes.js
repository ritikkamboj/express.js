//tourRoutes.js

const express = require('express');
const tourController = require('./../controllers/tourController.js');
const router = express.Router();

// router.param('id', tourController.checkId); // param middleware
router
  .route('/:id')
  .get(tourController.getSpecificTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.setNewTour);

module.exports = router;
