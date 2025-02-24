const AppError = require('../Utils/AppError'); // Add this line

// Function to handle Mongoose validation errors
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// Function to handle Mongoose duplicate key errors
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

// Function to handle Mongoose cast errors (invalid IDs)
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    // Set default values for error properties
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log the error stack trace
    console.error(err.stack);

    // Handle specific Mongoose errors
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'CastError') err = handleCastErrorDB(err);

    // Send error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

module.exports = errorHandler;
