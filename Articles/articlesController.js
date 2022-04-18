const express = require('express');
const router = express.Router();

router.get('/artiles', (req, res) => {
    res.send('Rota em Articles')
});


router.get('admin/artiles/new', (req, res) => {
    res.send('Rota em Controller para admin cadastrar novo article');
});

module.exports = router;