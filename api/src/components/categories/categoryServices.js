const errors = require('../../errors');
const categoryResource = require('./categoryResource');
const productResource = require('../products/productResource.js');


const categoryServices = () => {

    // Methods
    // TODO: Pass limit and offset to repository
    // TODO: Pass order to repository

    // Get all categories
    const getAllCategories = async (repository) => {
        const categories = await repository.find({});
        if (categories.length > 0) {
            Object.keys(categories).forEach((key) => {
                categoryResource(categories[key]);
            });
        }
        return categories;
    }

    // Get category by id
    const getCategoryById = async (repository, id) => {
        const category = await repository.findById(id);
        if (!category) {
            throw errors.newError(404, 'Category not found');
        }
        return categoryResource(category);
    }

    // Get products by category
    const getProductsByCategory = async (repository, id) => {
        let category = await repository.findById(id);
        if (!category) {
            throw errors.newError(404, 'Category not found');
        }
        const categoryProducts = await repository.getProducts(category);
        const products = categoryProducts.products;
        if (products.length > 0) {
            products.forEach((product) => {
                productResource(product);
            });
        }
        category = categoryResource(category);
        return { category, products };
    }
    
    // Create category
    const createCategory = async (repository, name, description) => {
        const newCategory = await repository.create({
            name,
            description
        });
        return productResource(newCategory);
    }

    // Update category
    const updateCategory = async (repository, id, params) => {
        const category = await repository.findById(id);
        if (!category) {
            throw errors.newError(404, 'Category not found');
        }
        const updatedCategory = await repository.update(category, params);
        return categoryResource(updatedCategory);
    }

    // Delete category
    const deleteCategory = async (repository, id) => {
        await repository.deleteById(id);
    }

    // Add products to category
    const addProductsToCategory = async (repository, categoryId, productIds) => {
        Object.keys(productIds).forEach(async (key) => {
            const productId = productIds[key];
            await repository.addProduct(categoryId, productId);
        }
        );
    }

    return {
        getAllCategories,
        getCategoryById,
        getProductsByCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        addProductsToCategory
    };
}

module.exports = categoryServices;