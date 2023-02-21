const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authLogic = () => {
    
    // Encrypt the password
    const encryptPassword = async (password) => {
        return bcrypt.hashSync(password, 10);
    };

    // TODO: create a config file for the secret key
    // Generate a new token
    const generateToken = (payload, expiresIn=172800) => {
        const options = {
            expiresIn
        };
        return jwt.sign(payload, process.env.API_KEY, options);
    };

    // Generate a new refresh token
    const generateRefreshToken = (payload) => {
        return generateToken(payload, getExpiresIn());
    };

    // Get the expiration time for the refresh token
    const getExpiresIn = () => {
        return 3600;
    };

    // Compare the password with the hash
    const compare = (password, hash) => {
        return bcrypt.compare(password, hash);
    };

    // TODO: create a config file for the secret key
    // Verify the token
    const verifyToken = (token) => {
        return jwt.verify(token, process.env.API_KEY);
    };

    return {
        encryptPassword,
        generateToken,
        generateRefreshToken,
        getExpiresIn,
        compare,
        verifyToken
    };
}

module.exports = authLogic;