const db = require("../conn/index");


    var normalizedPath = require("path").join(__dirname, "./model");
    require("fs").readdirSync(normalizedPath).forEach(function(file) {

        var model = require("../models/model/" + file )(db.sequelize, db.Sequelize);
        
        

        db[require('path').basename(file, '.js')] = model
        //console.log(db[require('path').basename(file, '.js')])

    });

// db.produto = require("../models/model/" + file )(db.sequelize, db.Sequelize);
//db.sequelize.sync()
module.exports = db

//sequelize.sync()
//sequelize.close()