const Sequelize = require('sequelize');
const connect = require('../Database/database');

const Categorie = connect.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type:Sequelize.STRING,
            allowNull: false
    }
})

//Categorie.sync({force: true}); criar as tabelas (rodar apenas uma vez)

module.exports = Categorie;