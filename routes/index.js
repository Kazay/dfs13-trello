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

router.get('/logout', function (req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
