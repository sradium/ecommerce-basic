const express = require("express");
const router = express.Router();

const userController = require("./userController");
const userRepository = require("./userRepository");
const userRepositoryImpl = require("./userRepositoryImpl");

const authLogic = require("../auth/authLogic");
const authLogicImpl = require("../auth/authLogicImpl");

const controller = userController(
    userRepository,
    userRepositoryImpl,
    authLogic,
    authLogicImpl
);

router.get('/', controller.getUsersByProperty);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);

module.exports = router;
