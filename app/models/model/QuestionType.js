module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'quiz';

    var Type = sequelize.define('QuestionType', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
    }, options)

    Type['association'] = {
        include: [
            'QuestionStore'
        ]
    }
        
    Type['relations'] = [
       
    ]


    return Type;
};