const db = require('../../../db/sequelize-orm/index');

const categorySquelizeRepositoryImpl = () => {
    const find = async (params) => {
        const categories = await db.models.Category.findAll({
            where: params
        });
        return categories;
    }

    const findOne = async (params) => {
        const category = await db.models.Category.findOne({
            where: params
        });
        return category;
    }

    const findById = async (id) => {
        const foundCategory = await db.models.Category.findByPk(id);
        return foundCategory;
    }

    const create = async (category) => {
        const newCategory = await db.models.Category.create(category);
        return newCategory;
    }

    const update = async (category, params) => {
        const updatedCategory = await category.update(params);
        return updatedCategory;
    }

    const deleteById = async (id) => {
        await db.models.Category.destroy({
            where: {
                id: id
            }
        });
    }

    const getProducts = async (category) => {
        const categoryProducts = await db.models.Category.findByPk(category.id, {include: 'products'});
        return categoryProducts;
    }

    const attachProducts = async (categoryId, productId) => {
        const foundCategory = await db.models.Category.findByPk(categoryId);
        const foundProduct = await db.models.Product.findByPk(productId);
        if (!foundCategory || !foundProduct) {
            return null;
        }
        await foundCategory.addProduct(foundProduct, { through: { createdAt: new Date(), updatedAt: new Date() } });
        return foundProduct;
    }

    const detachProducts = async (categoryId, productId) => {
        const foundCategory = await db.models.Category.findByPk(categoryId);
        const foundProduct = await db.models.Product.findByPk(productId);
        if (!foundCategory || !foundProduct) {
            return null;
        }
        await foundCategory.removeProduct(foundProduct);
    }

    return {
        find,
        findById,
        create,
        update,
        deleteById,
        getProducts,
        attachProducts,
        detachProducts
    };
}

module.exports = categorySquelizeRepositoryImpl;