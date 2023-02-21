const authentication = require('./authentication');
const validate = require('./validate');
const isAuthenticated = require('./isAuthenticated');

// Export all the middleware

module.exports = {
    authentication,
    validate,
    isAuthenticated
};