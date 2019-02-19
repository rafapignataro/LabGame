var express = require('express');
var router = express.Router();
const userScore = require('../contexts/score/services/score');

router.post('/new', async (req, res, next) => {
    var retorno = await userScore.newScore(req.body);
    res.send(retorno);
});

module.exports = app => app.use('/score', router);