module.exports = (sequelize, Sequelize) => {
    const options = {};
    options['schema'] = 'dbo';

    var Produto = sequelize.define('produto_teste', {
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
        preco: {
            type: Sequelize.DOUBLE
        },
        descricao: Sequelize.STRING
    }, options)

    // Variavel utilizada para gerenciar associações de Modelos.
    Produto['association'] = {
        include: [
            'user'
        ]
    }
        

    return Produto;
};