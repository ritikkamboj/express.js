const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

// below code to connect to remote DB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {

  console.log("DB connection done");

}
)
//below code is to connect to local DB

// mongoose.connect(process.env.DATABASE_LOCAL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// }).then(con => {
//   console.log("DB connection to local done");
// })


// console.log(app.get('env'));







console.log(process.env);

// const port = 3000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}...`);
});

