const authServices = require('./authServices');
const errors = require('../../errors');

// Controller is a function that returns an object with the methods
// that will be used in the routes
const authController = (
  userRepository, 
  userRepositoryImpl,
  authLogic,
  authLogicImpl
) => {
  // Repositories, services and logic are injected as dependencies
  const dbRepository = userRepository(userRepositoryImpl());
  const logic = authLogic(authLogicImpl());
  const authService = authServices();

  // Methods

  // Login - Verify user credentials and return a token
  // POST /auth/login
  // {
  //   "email": "string",
  //   "password": "string"
  // }
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const response = {};

      // Verify user credentials
      const user = { email, password };
      const tokens = await authService.login(
        dbRepository,
        logic,
        user
      );
      
      // Return a token
      response.token = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
      }
      res.status(200).json(response);
    } catch (error) {
      errors.errorHandler(error, req, res);
    }
  };

  // Register - Create a new user and return a token
  // POST /auth/register
  // {
  //   "name": "string",
  //   "lastName": "string
  //   "email": "string",
  //   "password": "string"
  // }
  const register = async (req, res) => {
    try {
      const { name, lastname, email, password } = req.body;
      const response = {};

      // Create a new user
      const user = { name, lastname, email, password };
      const tokens = await authService.register(
        dbRepository,
        logic,
        user
      );

      // Return a token
      response.token = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
      }
      res.status(201).json(response);
    } catch (error) {
      errors.errorHandler(error, req, res);
    }
  };

  // Logout - Delete the refresh token
  // POST /auth/logout
  const logout = async (req, res) => {
    try {
      const response = {};

      response.message = await authService.logout();
      res.status(200).json(response);
    } catch (error) {
      errors.errorHandler(error, req, res);
    }
  };

  // Refresh token - Return a new token
  // POST /auth/refresh-token
  const refreshToken = async (req, res) => {
    try {
      const response = {};

      const tokens = await authService.refreshToken(logic, req.user._id);

      // Return a token
      response.message = 'Token refreshed';
      response.refreshToken = tokens.refreshToken;
      response.expiresIn = tokens.expiresIn;
      res.status(200).json(response);
    } catch (error) {
      errors.errorHandler(error, req, res);
    }
  };

  // Get current user - Return the current user
  // GET /auth/current-user
  const getCurrentUser = async (req, res) => {
    try {
      const response = {};

      const user = await authService.getCurrentUser(dbRepository, req.user._id);

      // Return the current user
      response.user = user;
      res.status(200).json(response);
    } catch (error) {
      errors.errorHandler(error, req, res);
    }
  };

  return {
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser
  };
};

module.exports = authController;