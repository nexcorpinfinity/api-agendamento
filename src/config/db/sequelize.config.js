/* eslint-disable @typescript-eslint/no-var-requires */
// acesso ao banco pro sequelize rodar as migrations e seeders
require('dotenv').config();

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
};
