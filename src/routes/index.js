var express = require('express');
var router = express.Router();

router.get('/', (req, res) => { res.render('index', { title: 'GameLab' }); });

module.exports = app => app.use('/', router);