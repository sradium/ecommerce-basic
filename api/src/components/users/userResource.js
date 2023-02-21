// Description: User resource
// This is a resource pattern implementation.
// It is a pattern that separates the data access layer from the business logic layer.

const userResource = (params) => {
    return {
        name: params.name,
        lastname: params.lastname,
        email: params.email,
        avatar: params.avatar
    };
}

module.exports = userResource;