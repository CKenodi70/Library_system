// Import required modules
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');

// Function to sign a JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// Signup controller function
exports.signup = async (req, res) => {
    try {
        // Destructure required fields from request body
        const { fullName, email, password, phone, role } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
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
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login controller function
exports.login = async (req, res) => {
    try {
        // Destructure required fields from request body
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        const isMatch = await user.comparePassword(password)
        console.log(isMatch);
        if(!user || !isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

      
        // Sign a JWT token for the user
        const token = signToken(user._id);

        // Send success response with token
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

