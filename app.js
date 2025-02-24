// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoute = require('./Routes/userRoute');
const errorHandler = require('./Middleware/errorHandler'); // Add this line

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse JSON bodies (redundant, can be removed)
app.use(bodyParser.json());

// Route for user-related endpoints
app.use('/user', userRoute);

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Global error handling middleware
app.use(errorHandler); // Add this line

// Export the app module
module.exports = app;

