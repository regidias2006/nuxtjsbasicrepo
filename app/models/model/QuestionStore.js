module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'quiz';

    var QuestionStore = sequelize.define('QuestionStore', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        question: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
    }, options)

    QuestionStore['association'] = {
        include: []
    }
    
    QuestionStore['relations'] = [
        {
            to: 'QuestionType',
            mode: 'hasMany',
            foreignKey: 'type_id'
        }
    ]

    //sequelize.models.QuestionType.hasMany(QuestionStore, {foreignKey:'type_id'})
    
    

    return QuestionStore;
};