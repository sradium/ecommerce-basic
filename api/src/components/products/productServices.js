const errors = require('../../errors');
const productResource = require('./productResource');
const categoryResource = require('../categories/categoryResource');

const productServices = () => {

    // Methods
    // TODO: Pass limit and offset to repository
    // TODO: Pass order to repository

    // Get all products
    const getAllProducts = async (repository) => {
        const products = await repository.find({});
        if (products.length > 0) {
            Object.keys(products).forEach((key) => {
                productResource(products[key]);
            });
        }

        return products;
    }

    // Get product by id
    const getProductById = async (repository, id) => {
        const product = await repository.findById(id);
        if (!product) {
            throw errors.newError(404, 'Product not found');
        }
        return productResource(product);
    }

    // Get categories by product
    const getCategoriesByProduct = async (repository, id) => {
        let product = await repository.findById(id);
        if (!product) {
            throw errors.newError(404, 'Product not found');
        }
        const productCategories = await repository.getCategories(product);
        const categories = productCategories.categories;
        if (categories.length > 0) {
            Object.keys(categories).forEach((key) => {
                categoryResource(categories[key]);
            });
        }
        product = productResource(product);
        return { product, categories };
    }

    // Create product
    const createProduct = async (repository, name, description, price, stock, image) => {
        const newProduct = await repository.create({
            name,
            description,
            price,
            stock,
            image
        });
        return productResource(newProduct);
    }

    // Update product
    const updateProduct = async (repository, id, params) => {
        const product = await repository.findById(id);
        if (!product) {
            throw errors.newError(404, 'Product not found');
        }

        const updatedProduct = await repository.update(product, params);
        return productResource(updatedProduct);
    }

    // delete product
    const deleteProduct = async (repository, id) => {
        await repository.deleteById(id);
    }

    const addCategoriesToProduct = async (repository, id, categories) => {
        const foundProduct = await repository.findById(id);
        if (!foundProduct) {
            throw errors.newError(404, 'Product not found');
        }
        const productCategories = await repository.attachCategories(id, categories);
        const categoriesList = productCategories.categories;
        if (categoriesList.length > 0) {
            Object.keys(categoriesList).forEach((key) => {
                categoryResource(categoriesList[key]);
            });
        }
        return categoriesList;
    }

    return {
        getAllProducts,
        getProductById,
        getCategoriesByProduct,
        addCategoriesToProduct,
        createProduct,
        updateProduct,
        deleteProduct
    };
}

module.exports = productServices;