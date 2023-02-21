

const productRepository = (repository) => {
    const find = async (params) => await repository.find(params);
    const findOne = async (params) => await repository.findOne(params);
    const findById = async (id) => await repository.findById(id);
    const create = async (product) => await repository.create(product);
    const update = async (product, params) => await repository.update(product, params);
    const deleteById = async (id) => await repository.deleteById(id);

    // Has many categories through categoryProducts
    const getCategories = async (id) => await repository.getCategories(id);
    // Attach a category to a product
    const attachCategories = async (id, categoryId) => await repository.attachCategories(id, categoryId);
    // Detach a category from a product
    const detachCategories = async (id, categoryId) => await repository.detachCategories(id, categoryId);


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

module.exports = productRepository;