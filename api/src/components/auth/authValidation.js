const validator = require('express-validator');

// This is the validation for the login route
// It checks if the email and password are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const loginValidation = [
    validator.check('email', 'Please include a valid email').isEmail(),
    validator.check('password', 'Password is required').exists()
];

// This is the validation for the register route
// It checks if the name, email and password are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const registerValidation = [
    validator.check('name', 'Name is required').not().isEmpty(),
    validator.check('lastname', 'Name is required').not().isEmpty(),
    validator.check('email', 'Please include a valid email').isEmail(),
    validator.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    //validator.check('password', 'Please enter a strong password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
];

module.exports = {
    loginValidation,
    registerValidation
};
    