// Description: This file contains the resource for the category model
// This is a resource pattern implementation.
// It is a pattern that separates the data access layer from the business logic layer.

const categoryResource = (params) => {
    return {
        id: params.id,
        name: params.name,
        description: params.description
    };
}

module.exports = categoryResource;