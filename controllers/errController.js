const AppError = require("./../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}.`
    return new AppError(message, 400);
}

const handleDuplicateFieldDB = err => {
    const value = err.errmsg.match(/\v(['"])%(\1@![^\\]|\\.)*\1/)[0];
    const message = `Duplicate Field value : ${value}, Please use another value `;
    return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
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


        // console.log('ERROR', err);
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
        } else
            if (error.code === 11000) error = handleDuplicateFieldDB(error);

            else if (error.name === 'validationError')
                error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }



}