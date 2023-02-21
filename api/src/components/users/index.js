const userResource = require('./userResource');
const userServices = require('./userServices');
const userController = require('./userController');
const userRepository = require('./userRepository');
const userRepositoryImpl = require('./userRepositoryImpl');
const userRouter = require('./userRouter');

module.exports = {
    userResource,
    userServices,
    userController,
    userRepository,
    userRepositoryImpl,
    userRouter
};
