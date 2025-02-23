const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.route('/register').post(userController.signup); // Changed 'register' to 'signup'

module.exports = router;