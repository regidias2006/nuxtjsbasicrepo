module.exports = (element, db) => {

    var associationModels = {}

    try {
        if (db[element]) {
            db[element].relations.forEach(obj => {
                db.sequelize.models[obj.to].hasMany(db[element], { foreignKey: obj.foreignKey })
            })
        }

    } catch (error) {
        console.log('o erro persistiu:', error, element)
    }


    try {
        if (db[element]) {
            associationModels = db[element].association.include
            if (associationModels.length > 0) {

                var arr = [];

                associationModels.forEach(model => {
                    arr.push(db[model])
                })

                db[element]['includes'] = arr
            }
        }
    } catch (error) {
        console.log('o erro persistiu Associated:', error)
    }



}

