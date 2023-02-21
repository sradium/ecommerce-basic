const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        image: DataTypes.STRING,
        stock: DataTypes.INTEGER,
    }, {
        timestamps: true,
        tableName: 'products'
    });
}