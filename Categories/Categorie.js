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

module.exports = Categorie;