module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'dbo';

    var user = sequelize.define('userTeste', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, options)

    //user['association'] = 'testezinho'
    sequelize.models.produto_teste.hasMany(user, {foreignKey:'product_id'})
    
    

    return user;
};