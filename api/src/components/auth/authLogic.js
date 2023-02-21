const authLogic = (
    logic
) => {
    // Encrypt the password
    const encryptPassword = (password) => logic.encryptPassword(password);
    // Generate a new token
    const generateToken = (payload) => logic.generateToken(payload);
    // Generate a new refresh token
    const generateRefreshToken = (payload) => logic.generateRefreshToken(payload);
    // Get the expiration time for the refresh token
    const getExpiresIn = () => logic.getExpiresIn();
    // Compare the password with the hash
    const compare = (password, hash) => logic.compare(password, hash);
    // Verify the token
    const verifyToken = (token) => logic.verifyToken(token);

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