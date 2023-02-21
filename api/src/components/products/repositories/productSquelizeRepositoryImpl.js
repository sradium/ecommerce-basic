const db = require('../../../db/sequelize-orm/index');

const productSqulizeRepositoryImpl = () => {
    // Find all products
    // This function returns all products
    // params: object ({ name: 'product' } or { price: 100 })
    // return: array
    const find = async (params) => {
        const products = await db.models.Product.findAll({
            where: params
        });
        return products;
    }

    // Find one product
    // This function returns one product
    // params: object ({ id: 1 } or { name: 'product' })
    // return: object
    const findOne = async (params) => {
        const product = await db.models.Product.findOne({
            where: params
        });
        return product;
    }

    // Find product by id
    // This function returns one product
    // id: number
    // return: object
    const findById = async (id) => {
        const foundProduct = await db.models.Product.findByPk(id);
        return foundProduct;
    }

    const create = async (product) => {
        const newProduct = await db.models.Product.create(product);
        return newProduct;
    }

    const update = async (product, params) => {
        const updatedProduct = await product.update(params);
        return updatedProduct;
    }

    const deleteById = async (id) => {
        await db.models.Product.destroy({
            where: {
                id: id
            }
        });
    }

    const getCategories = async (product) => {
        const productCategories = await db.models.Product.findByPk(product.id, {include: 'categories'});
        return productCategories;
    }

    const attachCategories = async (productId, categoryIds) => {
        const foundProduct = await db.models.Product.findByPk(productId);
        for (let i = 0; i < categoryIds.length; i++) {
            const foundCategory = await db.models.Category.findByPk(categoryIds[i]);
            if (!foundCategory) {
                continue;
            }
            try {
                await foundProduct.addCategory(foundCategory, { through: { createdAt: new Date(), updatedAt: new Date() } });
            } catch (error) {
                continue;   
            }           
        }
        const productCategories = await db.models.Product.findByPk(productId, {include: 'categories'});
        return productCategories;
    }

    const detachCategories = async (productId, categoryId) => {
        const foundProduct = await db.models.Product.findByPk(productId);
        const foundCategory = await db.models.Category.findByPk(categoryId);
        await foundProduct.removeCategory(foundCategory);
    }

    return {
        find,
        findOne,
        findById,
        create,
        update,
        deleteById,
        getCategories,
        attachCategories,
        detachCategories
    };
}

module.exports = productSqulizeRepositoryImpl;