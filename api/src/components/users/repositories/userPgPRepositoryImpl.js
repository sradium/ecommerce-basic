const db = require('../../../db/pg-promise/index');

const userPgPRepositoryImpl = () => {
    // TODO: map params to column names
    const find = async (params) => {
        const users = await db.manyOrNone('SELECT * FROM users WHERE ${column~} = ${data}', params);
        return users;
    }

    // TODO: map params to column names
    const findOne = async (params) => {
        const users = await db.oneOrNone('SELECT * FROM users WHERE ${column~} = ${data}', params);
        return users;
    }

    const findById = async (id) => {
        const foundUser = await db.one('SELECT * FROM users WHERE id = $1', id);
        return foundUser;
    }

    const create = async (user) => {
        return user;
        const newUser = await db.one('INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [user.name, user.lastname, user.email, user.password]);
        return newUser;
    }

    const update = async (id, user) => {
        const updatedUser = await db.one('UPDATE users SET name = $1, lastname=$2, email = $3, password = $4 WHERE id = $5 RETURNING *', [user.name, user.lastname, user.email, user.password, id]);
        return updatedUser;
    }

    const deleteById = async (id) => {
        await db.none('DELETE FROM users WHERE id = $1', id);
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

module.exports = userPgPRepositoryImpl;