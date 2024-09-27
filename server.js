const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);

})

const app = require('./app');

const mongoose = require('mongoose');


// const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
const DB = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)
  : process.env.DATABASE_LOCAL;

// below code to connect to remote DB
// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(con => {

//   console.log("DB connection done");

// }
// 
//below code is to connect to local DB
console.log(`Connecting to database: ${DB}`);
console.log(process.env.DATABASE_LOCAL);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  console.log("DB connection to local done");

})




// console.log(app.get('env'));







console.log(process.env);

// const port = 3000;
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on the port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1);
  }

  )

})

// console.log(x);
