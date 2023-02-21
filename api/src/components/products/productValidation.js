const validator = require('express-validator');

// This is the validation for the create product route
// It checks if the name, description, price, stock and image are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const createProductValidation = [
    validator.check('name', 'Name is required').not().isEmpty(),
    validator.check('name', 'Name must be a string').isString(),
    validator.check('name', 'Name must be at least 3 characters and max 50').isLength({ min: 3, max: 50}),
    
    validator.check('price', 'Price is required').not().isEmpty(),
    validator.check('price', 'Price must be a number').isNumeric(),
    validator.check('price', 'Price must be greater than 0').isFloat({ min: 0.01 }),
    
    validator.check('stock', 'Stock is required').not().isEmpty(),
    validator.check('stock', 'Stock must be a number').isNumeric(),
    validator.check('stock', 'Stock must be greater than 0').isInt({ min: 1 }),
    
    validator.check('categories', 'Categories is required').not().isEmpty(),
    validator.check('categories', 'Categories must be an array').isArray(),
    
    validator.check('description', 'Description must be a string').optional().isString(),
    validator.check('description', 'Description must be at least 10 characters and max 250').optional().isLength({ min: 10, max: 250}),
    
    validator.check('image', 'Image must be a string').optional().isString(),
    validator.check('image', 'Image must be a valid URL').optional().isURL(),
];

// This is the validation for the update product route
// It checks if the name, description, price, stock and image are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const updateProductValidation = [
    validator.check('name', 'Name must be a string').optional().isString(),
    validator.check('name', 'Name must be at least 3 characters and max 50').optional().isLength({ min: 3, max: 50}),
    
    validator.check('description', 'Description must be a string').optional().isString(),
    validator.check('description', 'Description must be at least 10 characters and max 250').optional().isLength({ min: 10, max: 250}),
    
    validator.check('price', 'Price must be a number').optional().isNumeric(),
    validator.check('price', 'Price must be greater than 0').optional().isFloat({ min: 0.01 }),
    
    validator.check('stock', 'Stock must be a number').optional().isNumeric(),
    validator.check('stock', 'Stock must be greater than 0').optional().isInt({ min: 1 }),
    
    validator.check('image', 'Image must be a string').optional().isString(),
    validator.check('image', 'Image must be a valid URL').optional().isURL(),
];

module.exports = {
    createProductValidation,
    updateProductValidation
};
