const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    res.send('Rota em Controller')
});


router.get('admin/categories/new', (req, res) => {
    res.send('Rota em Controller para admin cadastrar nova categories');
});

module.exports = router;