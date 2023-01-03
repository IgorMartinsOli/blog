const express = require('express');
const router = express.Router();
const categorie = require('./Categorie');
const slugify = require('slugify');
const { render } = require('express/lib/response');
const { Router } = require('express');
const Categorie = require('./Categorie');

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
            res.redirect("/admin/categories")
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

router.get('/admin/categories/edit/:id', (req, res) => {
    let id = req.params.id;
    if(isNaN(id)){
        res.redirect('/admin/categories/');
    }

    categorie.findByPk(id)
    .then(categorie => {
        if(categorie !== undefined){
            res.render('admin/categories/edit', {
                categorie: categorie
            })
        }else{
            res.redirect('/admin/categories');
        }
    }).catch(err => {
        res.redirect('/admin/categories');
    })
});

router.post('/categories/update', (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let title = req.body.title;

    Categorie.update(
        {title: title,
        slug: slugify(title)},
        {where: {id: id}},
        ).then(() =>{
            res.redirect('/admin/categories')
        })
})

module.exports = router;