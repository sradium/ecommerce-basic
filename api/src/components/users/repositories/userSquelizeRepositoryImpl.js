const db = require('../../../db/sequelize-orm/index');

const userSquelizeRepositoryImpl = () => {
    const find = async (params) => {
        const users = await db.models.User.findAll({
            where: params
        });
        return users;
    }

    const findOne = async (params) => {
        const users = await db.models.User.findOne({
            where: params
        });
        return users;
    }

    const findById = async (id) => {
        const foundUser = await db.models.User.findByPk(id);
        return foundUser;
    }

    const create = async (user) => {
        const newUser = await db.models.User.create(user);
        return newUser;
    }

    const update = async (id, user) => {
        const updatedUser = await db.models.User.update(user, {
            where: {
                id: id
            }
        });
        return updatedUser;
    }

    const deleteById = async (id) => {
        await db.models.User.destroy({
            where: {
                id: id
            }
        });
    }

    return {
        find,
        findOne,
        findById,
        create,
        update,
        deleteById
    };
}

module.exports = userSquelizeRepositoryImpl;