const fs = require('fs');
const APIFeatures = require('./../utils/apiFeatures');
const Tour = require('./../models/tourModel');
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
  console.log('MOna', req.query);

  req.query.limit = '5';
  req.query.sort = '-ratingAverage, price';
  req.query.fields = 'name, price,ratingAverage,summary,difficulty';
  console.log(req.query)
  next();
}


exports.getAllTours = async (req, res) => {
  try {

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
    console.log('getALl ke andar', req.query)
    console.log(Tour.find())
    const features = new APIFeatures(Tour.find(), req.query).filter().limitFields().pagination();


    const tours = await features.query;

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
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
};

exports.getSpecificTour = async (req, res) => {
  try {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id : req.param.id})
    // const tour = tours.find((el) => el.id === id);

    // if (id > tours.length) {

    res.status(200).json({
      status: 'success',

      data: {
        tour: tour,
      },
    });
  }
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })

  }
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
    res.status(404).json({
      status: 'Error',
      message: err.message
    })
  }
};

exports.updateTour = async (req, res) => {
  try {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    console.log(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  }
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
};
exports.deleteTour = async (req, res) => {
  try {

    const tour = await Tour.findByIdAndDelete(req.params.id);
    console.log(req.body);

    res.status(204).json({
      status: 'success',
      data: null,
    });

  }
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
};

exports.getTourStats = async (req, res) => {
  try {
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

  }
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}
