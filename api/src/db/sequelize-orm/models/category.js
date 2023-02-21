const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        timestamps: true,
        tableName: 'categories'
    });
}