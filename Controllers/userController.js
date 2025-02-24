// Import required modules
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../Utils/asyncHandler'); // Add this line
const AppError = require('../Utils/AppError'); // Add this line

// Function to sign a JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// Signup controller function
exports.signup = asyncHandler(async (req, res, next) => {
    // Destructure required fields from request body
    const { fullName, email, password, phone, role } = req.body;

    // Check if all fields are provided
    if (!fullName || !email || !password || !phone) {
        return next(new AppError("All fields are required", 400));
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError("User already exists", 400));
    }

    // Determine user role based on existing users
    const user = await User.find();
    const userRole = user.length === 0 ? "super_admin" : "borrower";

    // Create a new user
    const newUser = new User({ fullName, email, password, phone, role: userRole });
    await newUser.save();

    // Sign a JWT token for the new user
    const token = signToken(newUser._id);

    // Exclude the password field from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    // Send success response with token
    res.status(200).json({ message: "User created successfully", token, user: userResponse });
});

// Login controller function
exports.login = asyncHandler(async (req, res, next) => {
    // Destructure required fields from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new AppError("Email and Password are required", 400));
    }

    // Check if user exists
    const user = await User.findOne({ email });

    const isMatch = await user.comparePassword(password);
   
    if (!user || !isMatch) {
        return next(new AppError("Invalid email or password", 401));
    }

    // Sign a JWT token for the user
    const token = signToken(user._id);

    // Send success response with token
    res.status(200).json({ message: "User logged in successfully", token });
});
