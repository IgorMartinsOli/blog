const Sequelize = require('sequelize');
const connect = require('../Database/database');
const Categorie = require('../Categories/Categorie');

const Article = connect.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type:  Sequelize.STRING,
            allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Categorie.hasMany(Article); //Uma Categorias tem muitos artigos
Article.belongsTo(Categorie); //Um Artigo pertence a uma categoria

module.exports = Article;