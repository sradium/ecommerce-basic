const { validationResult } = require('express-validator');
const createError = require('http-errors');

// Validate the request
module.exports = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return next(createError(422, 'Validation errors', { errors: errors.array() }));
    };
};