const {Sequelize} = require('sequelize');
const {config} = require('../config/config');
const setupModels = require('../db/models/setupModel');

const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUser,
    password:config.dbPassword,
    host:config.dbHost,
    port:config.dbPort,
    dialect: 'mysql',
    dialectModule:'mysql2',
});




setupModels(sequelize);

module.exports = sequelize;