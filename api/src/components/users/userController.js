const userServices = require('./userServices');

const userController = (
    userRepositoryInterface, 
    userRepositoryImpl, 
    authLogicInterface, 
    authLogicImpl
) => {
    const dbRepository = userRepositoryInterface(userRepositoryImpl());
    const authLogic = authLogicInterface(authLogicImpl());
    const userService = userServices();

    const getUsersByProperty = async (req, res) => {
        const params = {};
        const response = {};

        // Dynamically created query params based on endpoint params
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
            params[key] = req.query[key];
            }
        }
        try {
            response.users = await userService.getUserByProperty(dbRepository, params);
            res.status(200).json(authLogic);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const getUserById = async (req, res) => {
        try {
            const id = req.params.id;
            const response = {};

            response.user = await userService.getUserById(dbRepository, id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const createUser = async (req, res) => {
        try {
            const user = req.body;
            const response = {};

            response.user = await userService.createUser(
                dbRepository, 
                authLogic, 
                user.name,
                user.lastname,
                user.password,
                user.email
            );
            
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    return {
        getUsersByProperty,
        getUserById,
        createUser
    };
};

module.exports = userController;