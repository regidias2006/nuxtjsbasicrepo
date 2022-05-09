const db = require("../conn/index");
    var normalizedPath = require("path").join(__dirname, "./model");
    var dir = require("fs").readdirSync(normalizedPath).sort()
    dir.forEach(file => {
        var model = require("../models/model/" + file )(db.sequelize, db.Sequelize);
        db[require('path').basename(file, '.js')] = model
    });

module.exports = db