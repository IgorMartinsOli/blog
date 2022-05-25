const express = require('express');
const router = express.Router();
const categorie = require('./Categorie');
const slugify = require('slugify');
const { render } = require('express/lib/response');
const { Router } = require('express');

router.get('/admin/categories/new', (req, res) => {
    res.render("admin/categories/new");
}),

router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    if(title!=undefined || title != null) {
        categorie.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        });
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) => {
    categorie.findAll()
    .then(categories =>{
        res.render('admin/categories/index', {categories: categories});
    });
});

router.post('/categories/delete', (req, res) => {
    let id = req.body.id;
    if(id != null && id != undefined){
        if(!isNaN(id)){
            categorie.destroy({
                where: {id: id},
            }).then(() => {
                res.redirect('/admin/categories');
            })
        }else{//diferente de numero
            res.redirect('/admin/categories');
        }
    }else{//null ou undefinido
        res.redirect('/admin/categories');
    }
});

module.exports = router;