const Sequelize = require("sequelize");


require('dotenv').config();

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
          domain: process.env.DOMAIN,
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
    console.log('Conexão aberta com sucesso!');
  })
  .catch(err => {
    console.error('Incapaz de conectar com o banco', err);
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
module.exports = db;