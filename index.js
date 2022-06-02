const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect = require('./Database/database.js');

const categoriesController = require('./Categories/CategoriesController.js');
const articleController = require('./Articles/articlesController');

const Article = require('./Articles/Article');
const Categorie = require('./Categories/Categorie');

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connect
    .authenticate()
    .then(() => {
        console.log('Conexão com BD foi um sucesso');
    }).catch((err) => {
        console.log('Erro: ' + err.message);
    });

app.use('/', categoriesController);
app.use('/', articleController);

app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id', 'desc']
        ]
    }).then(articles => {
        Categorie.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories });
        })
    })
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {slug: slug}
    }).then(article => {
        if(article != undefined){
            Categorie.findAll().then(categories => {
                res.render("article", {article: article, categories: categories });
            })
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    })
});

app.get('categories/:slug', (req, res) => {
    let slug = req.params.slug;
    Categories.findOne({
        where:{
            slug: slug
        }
    }).then(categories => {
        
    })
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});