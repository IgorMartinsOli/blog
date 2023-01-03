const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connect = require('./Database/database.js');

const categoriesController = require('./Categories/CategoriesController.js');
const articleController = require('./Articles/articlesController');
const UserController = require('./User/UserController')

const Article = require('./Articles/Article');
const Categorie = require('./Categories/Categorie');
const User = require('./user/User.js');

app.set('view engine', 'ejs');

//sessions
app.use(session({
    secret: 'aWdvcmc1',
    cookie: {}
}))

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
app.use('/', UserController)

app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id', 'desc']
        ],
        limit: 4
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

app.get('/categories/:slug', (req, res) => {
    let slug = req.params.slug;
    Categorie.findOne({
        where:{
            slug: slug
        },
        include: [
            {model: Article}
        ]
    }).then(categorie => {
        if (categorie != undefined) {
            Categorie.findAll().then(categories => {
                res.render('index', {articles: categorie.articles, categories: categories});
            })
        }else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});