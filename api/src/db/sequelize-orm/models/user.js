const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {     
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        role: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        timestamps: true,
        tableName: 'users',
        getterMethods: {
            fullName() {
                return this.name + ' ' + this.lastname;
            },
            isAdmin() {
                return this.role === 'admin';
            },
            isUser() {
                return this.role === 'user';
            },
            isActive() {
                return this.status === 'active';
            },
            isInactive() {
                return this.status === 'inactive';
            },
            isDeleted() {
                return this.status === 'deleted';
            },
            isBlocked() {
                return this.status === 'blocked';
            }
        }
    });
}
