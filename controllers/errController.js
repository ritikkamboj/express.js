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
    if (err.isOperation) {

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
        sendErrorProd(err, res);
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message

    })
}