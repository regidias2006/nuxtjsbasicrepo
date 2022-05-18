module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'quiz';

    var Type = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        workday: {
            type: Sequelize.STRING,
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING.BINARY,
            allowNull: true
        },
    }, options)

    Type['association'] = {
        include: [
            
        ]
    }
        
    Type['relations'] = [
       
    ]


    return Type;
};