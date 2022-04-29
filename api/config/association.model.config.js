module.exports = (element, db) => {

    var associationModels = {}

    if (db[element].association) {
        associationModels = db[element].association.include
    }

    if (associationModels.length > 0) {
        
        var arr = [];

        associationModels.forEach(model => {
            arr.push(db[model])
        })
        
        db[element]['includes'] = arr
    }
}

