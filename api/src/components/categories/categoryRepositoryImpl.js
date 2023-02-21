// this file is the implementation of the category repository interface
// In this way, we can change the implementation of the repository without changing the service
const categoryRepositoryImpl = require('./repositories/categorySquelizeRepositoryImpl');

module.exports = categoryRepositoryImpl;