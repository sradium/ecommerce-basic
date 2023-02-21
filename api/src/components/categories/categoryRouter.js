const express = require('express');
const router = express.Router();

const { authentication, validate} = require('../../middleware/index');

const categoryController = require('./categoryController');
const categoryValidation = require('./categoryValidation');
// Category repository interface
// This interface is used to decouple the category package from the product package
// This interface is implemented in the category package
const categoryRepositoryInterface = require('./categoryRepository');
const categoryRepository = require('./categoryRepositoryImpl');

// Product repository interface
// This interface is used to decouple the category package from the product package
// This interface is implemented in the product package
const productRepositoryInterface = require('../products/productRepository');
const productRepository = require('../products/productRepositoryImpl');

// Category controller
// This controller is responsible for the management of the categories 
const controller = categoryController(
    categoryRepositoryInterface,
    categoryRepository,
    productRepositoryInterface,
    productRepository);

// Category router
// This router is responsible for the management of the categories
// All routes in this file require authentication
router.get('/', authentication, controller.getAllCategories);
router.get('/:id', authentication, controller.getCategoryById);
router.get('/:id/products', authentication, controller.getProductsByCategory);
router.post('/', authentication, validate(categoryValidation.createCategoryValidation), controller.createCategory);
router.put('/:id', authentication, validate(categoryValidation.updateCategoryValidation), controller.updateCategory);
router.post('/:id/products', authentication, validate(categoryValidation.addProductsToCategoryValidation), controller.addProductsToCategory);
router.delete('/:id', authentication, controller.deleteCategory);

module.exports = router;