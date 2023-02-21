// Description: Category repository interface
// This is the interface that the category service will use to interact with the database.

const categoryRepository = (repository) => {
    const find = async (params) => await repository.find(params);
    const findOne = async (params) => await repository.findOne(params);
    const findById = async (id) => await repository.findById(id);
    const create = async (category) => await repository.create(category);
    const update = async (category, params) => await repository.update(category, params);
    const deleteById = async (id) => await repository.deleteById(id);
    
    // Has many products through categoryProducts
    const getProducts = async (category) => await repository.getProducts(category);
    // Attach a product to a category
    const attachProducts = async (id, productId) => await repository.attachProducts(id, productId);
    // Detach a product from a category
    const detachProducts = async (id, productId) => await repository.detachProducts(id, productId);

    return {
        find,
        findOne,
        findById,
        create,
        update,
        deleteById,
        getProducts,
        attachProducts,
        detachProducts
    };
}

module.exports = categoryRepository;