// Load environment variables from config file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Import mongoose for MongoDB connection
const mongoose = require('mongoose');


// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.DATABASE, {
            // Connection options can be added here
        });
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// Export the connectDB function
module.exports = connectDB;