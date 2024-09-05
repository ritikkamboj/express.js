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
  console.log('Hello from the middleware');
  next();

});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});





app.use('/api/v1/tours', tourRouter); // this is the middleware
app.use('/api/v1/users', userRouter); // this is also middleware

module.exports = app;
