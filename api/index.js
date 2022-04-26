import express from "express";
// import db from "../src/db";

const Sequelize = require('sequelize');

const db = require("../app/models");
// const Produto = require('../app/models/index');


const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())

 

//db.sequelize.sync();


app.all('/api*', (req, res) => {
     
    console.log(db)
    // Find all users
    db.produto.findAll().then(products => {
        // res.status(200).send({
        //     title: "Node Express API",
        //     version: "0.0.1",
        //     products: products
        // });
    });
    

  //  console.log("Req body is: ", req.body)
    
    
})

module.exports = app