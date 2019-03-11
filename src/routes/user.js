'use strict';

var express = require('express');
var router = express.Router();
const userService = require('../contexts/users/services/user');
const storage = require('node-sessionstorage')

router.get('/:username', async function (req, res) {
    var retorno = await userService.getUser(req.params);
    res.send(retorno)
});

router.get('/highscore/:username', async function (req, res) {
    var retorno = await userService.getHighScoreByUsername(req.params);
    res.send(retorno)
});

router.post('/new', async (req, res) => {
    var retorno = await userService.newUser(req.body);
    res.send(retorno);
});

module.exports = app => app.use('/user', router);