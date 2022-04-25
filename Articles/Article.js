const Sequelize = require('sequelize');
const connect = require('../Database/database');

const Article = connect.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Article;