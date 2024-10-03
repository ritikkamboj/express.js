const fs = require('fs');
const APIFeatures = require('./../utils/apiFeatures');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');


// const { fail } = require('assert');

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

exports.aliasTopTours = (req, res, next) => {
  // console.log('MOna', req.query);

  req.query.limit = '5';
  req.query.sort = '-ratingAverage, price';
  req.query.fields = 'name, price,ratingAverage,summary,difficulty';
  // console.log(req.query)
  next();
}


exports.getAllTours = catchAsync(async (req, res, next) => {


  //mongoose method way
  // const tours =  Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   console.log('yeh waala', sortBy);
  //   query = query.sort(sortBy);
  // }
  // else {
  //   query = query.sort('-createdAt')
  // }

  // limiting fields 
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  // }
  // else {
  //   query = query.select('-__v')
  // }

  //Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments();
  //   console.log('ganesh ji ')
  //   if (skip >= numTours) throw new Error('This page does not exist');
  // }
  // console.log(x)
  // console.log('getALl ke andar', req.query)
  // console.log(Tour.find())
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .limitFields()
    .pagination();


  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });



});

exports.getSpecificTour = catchAsync(async (req, res, next) => {

  console.log(req.params, 'yeh waala');
  console.log('jai ');


  // const id = req.params.id * 1;
  const tour = await Tour.findById(req.params.id);
  // console.log(tour)
  // Tour.findOne({_id : req.param.id})
  // const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {

  if (!tour) {
    return next(new AppError('No Tour find with this ID', 404));
  }

  res.status(200).json({
    status: 'success',

    data: {
      tour: tour,
    },
  });


});


exports.setNewTour = catchAsync(async (req, res, next) => {
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

});

exports.updateTour = catchAsync(async (req, res, next) => {


  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  console.log(req.body);

  if (!tour) {
    return next(new AppError('No Tour find with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });

});
exports.deleteTour = catchAsync(async (req, res, next) => {


  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No Tour find with this ID', 404));
  }
  console.log(req.body);

  res.status(204).json({
    status: 'success',
    data: null,
  });


});

exports.getTourStats = catchAsync(async (req, res, next) => {

  const stats = await Tour.aggregate([
    {

      $match: { ratingAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      }
    }, {
      $sort: { avgPrice: 1 }
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }

  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: stats
    }
  })



})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      },

    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0,

      }
    },
    {
      $sort: { numTourStarts: -1, month: 1 }
    },
    {
      $limit: 12
    }
  ])

  const resultsLength = plan.length
  res.status(200).json({
    status: 'success',
    length: resultsLength,
    data: { plan }
  })

})