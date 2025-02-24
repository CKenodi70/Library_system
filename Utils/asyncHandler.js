// Utility function to handle async errors
const asyncHandler = fn => (req, res, next) => {
    // Wrap the function in a promise and catch any errors
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the asyncHandler function
module.exports = asyncHandler;
