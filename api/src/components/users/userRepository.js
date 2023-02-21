// Description: User repository
// This is a repository pattern implementation. 
// It is a pattern that separates the data access layer from the business logic layer.

const userRepository = (repository) => {
    const find = async (params) => await repository.find(params);
    const findOne = async (params) => await repository.findOne(params);
    const findById = async (id) => await repository.findById(id);
    const create = async (user) => await repository.create(user);
    const update = async (id, user) => await repository.update(id, user);
    const deleteById = async (id) => await repository.deleteById(id);

    return {
        find,
        findOne,
        findById,
        create,
        update,
        deleteById
    };
}

module.exports = userRepository;