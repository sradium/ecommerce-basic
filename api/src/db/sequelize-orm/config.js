const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_DIALECT,
    DB_POOL_MAX
} = process.env;

const sequelizeConfig = {
    host: DB_HOST || 'localhost',
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'postgres',
    database: DB_NAME || 'ecommerce',
    port: DB_PORT || 5432,
    dialect: DB_DIALECT || 'postgres',
    pool: {
        max: DB_POOL_MAX || 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = sequelizeConfig;