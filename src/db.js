const Sequelize = require('sequelize');

require('dotenv').config();

const dbName = process.env.DB_DATABASE; 
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mssql',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false, // eslint-disable-line no-console
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    define: {
        engine: 'InnoDB',
        collate: 'latin1_swedish_ci',
    },
    dialectOptions: {
        // stream: proxyConnection,
        options: {
            encrypt: true,
            requestTimeout: 300000,
            enableArithAbort: false,
        },
    },
});

// module.exports = sequelize;



