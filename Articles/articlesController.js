const express = require('express');
const router = express.Router();
const Categorie = require('../Categories/Categorie');

router.get('/artiles', (req, res) => {
    res.send('Rota em Articles')
});

router.get('/admin/articles/new', (req, res) => {
    Categorie.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
    
});



module.exports = router;