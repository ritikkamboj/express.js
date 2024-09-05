const fs = require('fs');

const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );



exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getSpecificTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {

  res.status(200).json({
    status: 'success',

    // data: {
    //   tour: tour,
    // },
  });
};

exports.setNewTour = (req, res) => {
  console.log('jai shree ram');
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated Tours...',
    },
  });
};
exports.deleteTour = (req, res) => {
  console.log(req.body);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
