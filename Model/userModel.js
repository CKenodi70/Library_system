const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fuulName: {
        type: String,
        required: [true, "Please Provide Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Provide Your Email"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
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