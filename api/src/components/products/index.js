const productServices = require('./productServices');
const productController = require('./productController');
const productRepository = require('./productRepository');
const productRepositoryImpl = require('./productRepositoryImpl');
const productRouter = require('./productRouter');

// Product package
// This package is responsible for the products

module.exports = {
    productServices,
    productController,
    productRepository,
    productRepositoryImpl,
    productRouter
};