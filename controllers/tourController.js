const fs = require('fs');

const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );



// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'missing name or price',
//     });
//   }
//   next();
// };

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

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.requestTime);

    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });

  }
  catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    })
  }
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

exports.setNewTour = async (req, res) => {

  try {
    console.log('jai shree ram');

    // const newTour = new Tour({});
    // newTour.save()

    const newTour = await Tour.create(req.body);


    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  }
  catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err.message
    })
  }
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
