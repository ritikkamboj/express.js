const fs = require('fs');

const dotenv = require('dotenv');
// const app = require('./app');
const Tour = require('./../../models/tourModel')
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

// below code to connect to remote DB
// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(con => {

//   console.log("DB connection done");

// }
// )
//below code is to connect to local DB

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log("DB connection to local done");

})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// in above code dirname value is 

//sending datat to db 

const importData = async () => {

    try {
        await Tour.create(tours);
        console.log('Data Successfully loaded');

    }
    catch (err) {
        console.log(err);
    }
    process.exit();
}

//Delete All Data form DB npm 

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted')


    }
    catch (err) {
        console.log(err);

    }
    process.exit();
}
// console.log();
if (process.argv[2] === '--import') {

    importData()
}
else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log('jai shree ram', process.argv);
