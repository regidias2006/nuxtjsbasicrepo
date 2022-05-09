// import express from "express";
// const db = require("../../app/models");

// const app = express()
// app.use(express.urlencoded({extended: true}));
// app.use(express.json())






module.exports = (app, db) => {
    var models = []
    var apiHost = '/api/v1/'

    var normalizedPath = require("path").join(__dirname, "../../app/models/model");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        models.push(require('path').basename(file, '.js'))
    });

    models.forEach(
        element => {
         
            require("../config/association.model.config")(element, db);

            app.post(apiHost + element, (req, res) => {

                // Create a element
                db[element].create(req.body).then(obj => {
                    res.send(
                        {
                            obj: obj
                        }
                    )
                });

            })

            app.get(apiHost + element, (req, res) => {

                // Find all element
                db[element].findAll({
                    include: db[element].includes
                }).then(obj => {
                    res.send(
                        {
                            obj: obj
                        }
                    )
                });

            })

            app.get(apiHost + element + '/:id', (req, res) => {

                // Find all element by ID
                db[element].findAll({
                    where: {
                        id: req.params.id,
                    },
                    include: db[element].includes
                }).then(obj => {
                    res.send(
                        {
                            obj: obj
                        }
                    )
                });
            })

            app.delete(apiHost + element + '/:id', (req, res) => {

                // delete all element by ID
                db[element].destroy({
                    where: {
                        id: req.params.id,
                    }
                }).then(obj => {
                    res.send(
                        {
                            obj: obj
                        }
                    )
                });
            })

            app.put(apiHost + element + '/:id', (req, res) => {

                // Update all element by ID
                db[element].update(req.body, {
                    where: {
                      id: req.params.id
                    }
                  })
                  .then(obj => {
                    res.send(
                        {
                            obj: req.body
                        }
                    )
                });
            })

        }
    )

    return app
}