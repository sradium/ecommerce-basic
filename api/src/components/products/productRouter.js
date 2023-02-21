const express = require('express');
const router = express.Router();

const { authentication, validate} = require('../../middleware/index');

const productController = require('./productController');
const productValidation = require('./productValidation');
// Product repository interface
// This interface is used to decouple the product package from the category package
// This interface is implemented in the category package
const productRepositoryInterface = require('./productRepository');
const productRepository = require('./productRepositoryImpl');

// Category repository interface
// This interface is used to decouple the product package from the category package
// This interface is implemented in the category package
const categoryRepositoryInterface = require('../categories/categoryRepository');
const categoryRepository = require('../categories/categoryRepositoryImpl');

// Product controller
// This controller is responsible for the management of the products
const controller = productController(
    productRepositoryInterface,
    productRepository,
    categoryRepositoryInterface,
    categoryRepository);

// Product router
// This router is responsible for the management of the products
// All routes in this file require authentication
router.get('/', authentication,controller.getAllProducts);
router.get('/:id', authentication, controller.getProductById);
router.get('/:id/categories', authentication, controller.getCategoriesByProduct);
router.post('/', authentication, validate(productValidation.createProductValidation), controller.createProduct);
router.put('/:id', authentication, validate(productValidation.updateProductValidation), controller.updateProduct);
router.delete('/:id', authentication, controller.deleteProduct);

module.exports = router;
