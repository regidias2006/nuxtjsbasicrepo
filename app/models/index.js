const dbConfig = require("../../src/db");
const Sequelize = require("sequelize");


require('dotenv').config();

const dbName = process.env.DB_DATABASE; 
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,//dbConfig.HOST,
//   dialect: 'mssql', //dbConfig.dialect,
// dialectOptions: {
//     trustedConnection: true
//   },
//   operatorsAliases: 0, 
//   pool: {
//     max: 5, //dbConfig.pool.max,
//     min: 0, //dbConfig.pool.min,
//     //acquire: 10000, //dbConfig.pool.acquire,
//     idle: 10000 //dbConfig.pool.idle
//   }
// });

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, { 
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          userName: process.env.NODE_ENV == 'production' ? process.env.DB_USER : 'jagrdias',
          password: process.env.NODE_ENV == 'production' ? process.env.DB_PASS : 'Flex2041',
          domain: 'AMERICAS',
        },
      },
      options: {
        port: 1433,
        requestTimeout: 60000,
      },
    },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database não vai:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.produto = require("./model/produto")(sequelize, Sequelize);
//sequelize.sync()
//sequelize.close()

module.exports = db;