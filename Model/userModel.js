const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
        minlength: 6
    },
    phone: Number, 
    role: {
        type: String,
        enum: ['super_admin' ,'admin', 'librarian', 'borrower'],
        default: 'borrower'
    },
});

const User =  mongoose.model('User', userSchema);
module.exports = User;

