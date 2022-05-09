module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'quiz';

    var Alternatives = sequelize.define('Alternatives', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        isCorrect: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, options)

    Alternatives['association'] = {
        include: []
    }
    
    Alternatives['relations'] = [
        {
            to: 'QuestionStore',
            mode: 'hasOne',
            foreignKey: 'questionStore_id'
        }
    ]

    return Alternatives;
};