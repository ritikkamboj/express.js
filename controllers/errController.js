const AppError = require("./../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}.`
    return new AppError(message, 400);
}
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}


const sendErrorProd = (err, res) => {
    // operational trusted error 
    if (err.isOperational) {

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    // programing and another type of error 
    else {


        console.log('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something Went Wrong'
        })
    }

}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'


    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };


        if (err.name === 'CastError') {
            error = handleCastErrorDB(error)
            console.log(error, 'Indian hockey');


        }
        sendErrorProd(error, res);
    }

}