// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Route for user registration
router.route('/register').post(userController.signup); // Changed 'register' to 'signup'
router.route('/login').post(userController.login);

// Export the router module
module.exports = router;

