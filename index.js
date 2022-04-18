const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect = require('./Database/database.js');
const categoriesController = require('./Categories/CategoriesController.js');
const articleController = require('./Articles/articlesController');

connect
    .authenticate()
    .then(() => {
        console.log('Conexão com BD foi um sucesso');
    }).catch((err) => {
        console.log('Erro: ' + err.message);
    });

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', categoriesController);
app.use('/', articleController);

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});