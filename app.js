// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse JSON bodies (redundant, can be removed)
app.use(bodyParser.json());

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Export the app module
module.exports = app;