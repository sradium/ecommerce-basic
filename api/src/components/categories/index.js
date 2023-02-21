const categoryServices = require('./categoryServices');
const categoryController = require('./categoryController');
const categoryRepository = require('./categoryRepository');
const categoryRepositoryImpl = require('./categoryRepositoryImpl');
const categoryRouter = require('./categoryRouter');

// Category package
// This package is responsible for the categories of the products

module.exports = {
    categoryServices,
    categoryController,
    categoryRepository,
    categoryRepositoryImpl,
    categoryRouter
};