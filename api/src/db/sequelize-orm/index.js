const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config);


const models = {
    User: require('./models/user')(sequelize),
    Category: require('./models/category')(sequelize),
    Product: require('./models/product')(sequelize),
    ProductsCategories: require('./models/products_categories')(sequelize),

    // Add more models here
};

// TODO: Make asocciations dynamic and add them to models

// Add associations here
sequelize.models.Category.belongsToMany(sequelize.models.Product, { foreignKey: 'category_id', through: 'products_categories', as: 'products' });
sequelize.models.Product.belongsToMany(sequelize.models.Category, { foreignKey: 'product_id', through: 'products_categories', as: 'categories' });

sequelize.sync();


module.exports = sequelize;
