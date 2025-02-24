// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const asyncHandler = require('../Utils/asyncHandler');

// Route for user registration
router.route('/register').post(asyncHandler(userController.signup)); // Changed 'register' to 'signup'
router.route('/login').post(asyncHandler(userController.login));

// Export the router module
module.exports = router;

