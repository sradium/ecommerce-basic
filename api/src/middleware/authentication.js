const authLogicImpl = require('../components/auth/authLogicImpl');
const authLogicInterface = require('../components/auth/authLogic');
const createError = require('http-errors');

// Authentication middleware
// Verify if the request has a valid token
// If the request has a valid token, the user is added to the request
module.exports = (req, res, next) => {
    const authLogic = authLogicInterface(authLogicImpl());
    const { authorization, refreshtoken: refreshToken} = req.headers;
    if (! authorization) {
        const error = createError(401, 'Access denied. No token provided.');
        return next(error);
    }

    if (! authorization.startsWith('Bearer ')) {
        const error = createError(400, 'Access denied. Invalid token.');
        return next(error);
    }
    
    try {
        const validToken = authorization.slice(7, authorization.length);
        const decoded = authLogic.verifyToken(validToken);

        req.user = decoded;

        // Refresh token
        // If the refresh token is valid and it is about to expire, a new token is generated
        if (refreshToken) {
            const validRefreshToken = refreshToken.slice(7, refreshToken.length);
            const decodedRefreshToken = authLogic.verifyToken(validRefreshToken);
            const now = new Date();
            const exp = new Date(decodedRefreshToken.exp * 1000);
            const diff = exp.getTime() - now.getTime();
            if (diff < 0) {
                const error = createError(400, 'Access denied. Invalid token.');
                return next(error);
            }
            if (diff < 30000) {
                const newToken = authLogic.generateRefreshToken({ _id: decodedRefreshToken._id});
                res.setHeader('RefreshToken', newToken);
            }
        }

        next();
    }
    catch (ex) {
        const error = createError(400, 'Access denied. Invalid token.');
        return next(error);
    }
};