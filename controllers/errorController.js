const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?/);
    const message = `Duplic ate Fields value: ${value}. Please use another value`;
    return new AppError(message, 400);
};
const handleValidationError = err => {
    const errors = Object.value(err.errors).map(el => el.message);
    const message = `Invalid input data${errors.join('. ')}`;
    return new AppError(message, 400);
};
//  JWT ERROR
const handleJwtError = () => new AppError('Somthing went wrong please login  again', 401);
const TokenExpiredError = () => new AppError('Your Token has expired .', 401);

// Production Error
const productionError = (req, res, err) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: 'error',

            message: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',

        message: 'Please try again later!',
    });
};

// Development Error
const developmentError = (req, res, err) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: 'error',
            Error: err,

            message: err.message,
            stack: err.stack,
        });
    }
    res.status(err.statusCode).json({
        status: 'error',

        Error: err,
        message: err.message,
        stack: err.stack,
    });
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, _next) => {
    // eslint-disable-next-line no-param-reassign
    err.statusCode = err.statusCode || 500; // 500 == Server Internal error
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') developmentError(req, res, err);
    // Sending to user
    else {
        let error = { ...err };
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') {
            error = handleValidationError(error);
        }
        if (error.name === 'JsonWebTokenError') error = handleJwtError();
        if (error.name === 'TokenExpiredError') error = TokenExpiredError();
        productionError(req, res, err);
    }
};
