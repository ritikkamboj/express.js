const express = require('express');
const morgan = require('morgan');

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
  const err = new Error(`There is no Data corresponding to ${req.originalUrl}`);
  err.statusCode = 404;
  err.status = 'fail'
  next(err);


});

// for Opeartional Error ( global error handling middleware )
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message

  })
})

module.exports = app;
