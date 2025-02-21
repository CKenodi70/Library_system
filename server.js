// Load environment variables from config file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Import required modules
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./Utils/dbs');

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Test route to check if API is working
app.get('/test', (req, res) => {
    res.json({ message: 'API Working' });
});

// Connect to the database and start the server
connectDB(
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
);