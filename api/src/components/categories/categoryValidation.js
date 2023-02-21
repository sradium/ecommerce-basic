const validator = require('express-validator');

// This is the validation for the create category route
// It checks if the name and description are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const createCategoryValidation = [
    validator.check('name', 'Name is required').not().isEmpty(),
    validator.check('name', 'Name must be between 2 and 50 characters').isLength({ min: 2, max: 50 }),
    validator.check('name', 'Name must be a string').isString(),
    
    validator.check('description', 'Description is required').not().isEmpty(),
    validator.check('description', 'Description must be between 2 and 250 characters').isLength({ min: 2, max: 250 }),
    validator.check('description', 'Description must be a string').isString()
];

// This is the validation for the update category route
// It checks if the name and description are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const updateCategoryValidation = [
    validator.check('name', 'Name must be between 2 and 50 characters').optional().isLength({ min: 2, max: 50 }),
    validator.check('name', 'Name must be a string').optional().isString(),

    validator.check('description', 'Description must be between 2 and 250 characters').optional().isLength({ min: 2, max: 250 }),
    validator.check('description', 'Description must be a string').optional().isString()
];

// This is the validation for the add products to category route
// It checks if the id and productIds are not empty
// If they are empty it returns an error
// If they are not empty it calls the next middleware
const addProductsToCategoryValidation = [
    validator.check('id', 'Id is required').not().isEmpty(),
    validator.check('productIds', 'Product Ids is required').not().isEmpty(),
    validator.check('productIds', 'Product Ids must be an array').isArray()
];

// This is the validation for the delete category route
// It checks if the id is not empty
// If it is empty it returns an error
const deleteCategoryValidation = [
    validator.check('id', 'Id is required').not().isEmpty()
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    deleteCategoryValidation,
    addProductsToCategoryValidation
};
