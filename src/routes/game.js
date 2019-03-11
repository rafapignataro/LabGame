var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game', { title: 'LAB' });
});

router.get('/user/:username',async function(req, res) {
    var userService = require('../contexts/users/services/user');
    var retorno = await userService.getUser(req.params);
    res.send({retorno});
});

router.post('/user/newscore', async (req, res, next) => {
    var userScore = require('../contexts/score/services/score');
    var retorno = await userScore.newScore(req.body);
    res.send({retorno});
});

module.exports = app => app.use('/game', router);