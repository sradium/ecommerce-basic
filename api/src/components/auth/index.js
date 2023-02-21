const authServices = require('./authServices');
const authController = require('./authController');
const authLogic = require('./authLogic');
const authLogicImpl = require('./authLogicImpl');
const authRouter = require('./authRouter');

// Auth package
// This package is responsible for the authentication of the users

module.exports = {
    authController,
    authLogic,
    authLogicImpl,
    authServices,
    authRouter
};
