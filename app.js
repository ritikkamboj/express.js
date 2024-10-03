const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errController');


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

}


const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

// console.log(app);
app.use(express.json()); // middleware

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  console.log(req.headers);

  next();
});





app.use('/api/v1/tours', tourRouter); // this is the middleware
app.use('/api/v1/users', userRouter); // this is also middleware

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `There is no Data corresponding to ${req.originalUrl}`
  // })
  // next();
  // const err = new Error(`There is no Data corresponding to ${req.originalUrl}`);
  // err.statusCode = 404;
  // err.status = 'fail'

  next(new AppError(`There is no Data corresponding to ${req.originalUrl}`, 404))
  // next(err);


});

// for Opeartional Error ( global error handling middleware )
app.use(globalErrorHandler);

module.exports = app;
