const express = require('express');
const router = express.Router();

const { authentication, validate} = require('../../middleware/index');

const authController = require('./authController');
const authValidation = require('./authValidation');
const authLogicInterface = require('./authLogic');
const authLogic = require('./authLogicImpl');

// User repository interface
// This interface is used to decouple the auth package from the user package
// This interface is implemented in the user package
const userRepositoryInterface = require('../users/userRepository');
const userRepository = require('../users/userRepositoryImpl');

// Auth controller
// This controller is responsible for the authentication of the users
const controller = authController(
    userRepositoryInterface,
    userRepository,
    authLogicInterface,
    authLogic);

// Auth router
// This router is responsible for the authentication of the users
router.post('/login', validate(authValidation.loginValidation), controller.login);
router.post('/register', validate(authValidation.registerValidation), controller.register);
router.post('/logout', authentication, controller.logout);
router.post('/refresh', authentication, controller.refreshToken);
router.get('/me', authentication, controller.getCurrentUser);

module.exports = router;