// import express from "express";
// import db from "../src/db";

// const Sequelize = require('sequelize');

// var normalizedPath = require("path").join(__dirname, "routes");
//var files = []
// var routes = []

// require("fs").readdirSync(normalizedPath).forEach(function(file) {
//  routes.push(require("../api/routes/" + file)) 
// console.log(require("../api/routes/" + file), 'Aqui ' + require('path').basename(file, '.js')) 
//  routes[require('path').basename(file, '.js')] = require("../api/routes/" + file);
//  module.exports = require("../api/routes/" + file)
// });

var app = require("./config/route.config");

module.exports = app
// module.exports['product'] = require("../api/routes/product")
//const routes = require("../api/routes/product");

// const Produto = require('../app/models/index');


// const app = express()
// app.use(express.urlencoded({extended: true}));
// app.use(express.json())

 

//db.sequelize.sync();



// app.all('/api', (req, res) => {
 
//     // console.log(db)
//     // Find all users
//     db.produto.findAll().then(products => {
//         res.status(200).send({
//             title: "Node Express API",
//             version: "0.0.1",
//             products: products
//         });

//     });
    
//   })
// //   //  console.log("Req body is: ", req.body)
    
    
// })
// for(var route in routes){
//   routes[route]
// }

// Object.entries(routes).forEach(([key, val])=>{
//   module.exports = val
// })

// module.exports = {routes}