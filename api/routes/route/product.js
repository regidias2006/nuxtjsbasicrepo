module.exports = (app, db) => {

    var models = []

    //Define link API
    var apiHost = '/api/v2/'

    var normalizedPath = require("path").join(__dirname, "../../../app/models/model");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        models.push(require('path').basename(file, '.js'))
    });

    require("../../config/association.model.config")('product', db);


    //Write manually your model
    app.get(apiHost + 'product/testnewroute', (req, res) => {

        // Find all element
        db['product'].findAll({
            include: db['product'].includes
        }).then(obj => {
            res.send(
                {
                    obj: obj
                }
            )
        });

    })

    // Write your new personal routes 

}