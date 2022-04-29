import express from "express";
const db = require("../../app/models");

var app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// To basic Crud actions
require("../routes/genericRoutes")(app, db);

// If you need a personal route
var normalizedPath = require("path").join(__dirname, "../routes/route/");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("../routes/route/" + file)(app, db);
});


db.sequelize.sync()

module.exports = app