var express = require('express');
var router = express.Router();

const title = 'Trello';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET registration page. */
router.get('/register', function(req, res, next) {
	res.render('register');
});

module.exports = router;
