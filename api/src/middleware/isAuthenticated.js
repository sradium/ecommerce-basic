const createError = require('http-errors');

// Check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.user()) {
        return next();
    }
    next(createError(401));
};

module.exports = isAuthenticated;