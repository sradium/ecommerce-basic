const errors = require('../../errors');

const userResource = require('../users/userResource');
const userServices = require('../users/userServices');

const userService = userServices();

const authServices = () => {    
    // TODO: save in a database the refresh tokens

    // Methods

    // Login - Verify user credentials and return a token
    // Search user by email and verify password
    // If it's valid, return a token
    const login = async (dbRepository, authLogic, user) => {
        const userInDb = await userService.getUserByProperty(dbRepository, { email: user.email });
        if (!userInDb) {
            throw errors.newError(errors.HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid email or password.')
        };
        
        const validPassword = await authLogic.compare(user.password, userInDb.password);
        if (!validPassword) {
            throw errors.newError(errors.HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid email or password.')
        };
        
        const accessToken = authLogic.generateToken({ _id: userInDb.id});
        const refreshToken = authLogic.generateRefreshToken({ _id: userInDb.id});
        const expiresIn = authLogic.getExpiresIn();
        return { accessToken, refreshToken, expiresIn };
    }

    // Register - Create a new user and return a token
    // Create a new user and return a token
    const register = async (dbRepository, authLogic, user) => {
        const userInDb = await userService.getUserByProperty(dbRepository, { email: user.email });
        if (userInDb) {
            throw errors.newError(errors.HTTP_STATUS_CODE.BAD_REQUEST, 'User already registered.')
        };

        const newUser = await userService.createUser(
            dbRepository, 
            authLogic,
            user.name,
            user.lastname,
            user.password,
            user.email
        );
        const accessToken = authLogic.generateToken({ _id: newUser.id});
        const refreshToken = authLogic.generateRefreshToken({ _id: newUser.id});
        const expiresIn = authLogic.getExpiresIn();
        return { accessToken, refreshToken, expiresIn };
    }

    // Logout - Delete refresh token
    // Delete refresh token from database
    // Return a message
    const logout = async () => {
        return 'Logout successful.';
    }

    // Refresh token - Generate a new token
    // Generate a new token
    const refreshToken = async (authLogic, id) => {
        const refreshToken = authLogic.generateRefreshToken({ _id: id});
        const expiresIn = authLogic.getExpiresIn();
        return { refreshToken, expiresIn };
    }

    // Get current user - Get current user
    // Get current user from database by id
    const getCurrentUser = async (dbRepository, id) => {
        const user = await userService.getUserById(dbRepository, id);
        if (!user) {
            throw errors.newError(errors.HTTP_STATUS_CODE.NOT_FOUND, 'User not found.')
        };

        return userResource(user);
    }

    return {
        login,
        register,
        logout,
        refreshToken,
        getCurrentUser
    };
}

module.exports = authServices;