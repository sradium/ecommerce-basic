const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ProductsCategories', {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'products_categories'
    });
};