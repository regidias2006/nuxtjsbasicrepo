module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'quiz';

    var Type = sequelize.define('UserData', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        QuestionScore: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        Score: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        questionInitialTime: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        questionEndTime: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        isCorrect: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        timeInterval: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    }, options)

    Type['association'] = {
        include: [
            'QuestionStore',
            'User'
        ]
    }
        
    Type['relations'] = [
        {
            to: 'User',
            mode: 'hasOne',
            foreignKey: 'UserId'
        },
        {
            to: 'QuestionStore',
            mode: 'hasOne',
            foreignKey: 'questionId'
        }
    ]


    return Type;
};