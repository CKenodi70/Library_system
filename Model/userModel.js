const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add this line

const userSchema = new mongoose.Schema({
    fullName: {
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
    phone: {
        type: String,
        required: [true, "Please Provide Your Phone Number"],
        match: [/^[0-9]{11}$/, 'Please provide a valid phone number']
    },
    role: {
        type: String,
        enum: ['super_admin' ,'admin', 'librarian', 'borrower'],
        default: 'borrower'
    },
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;