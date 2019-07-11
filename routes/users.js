var express = require('express');
var router = express.Router();
var server = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
	let login = req.body.loginName;
	server.db.collection('users').findOne({ 
		$or: [{ username: login },{ email: login }], 
		password: req.body.password },
	(err, resp) => {
		if(err) throw err;
		if(resp)
		{
			req.session.user = resp;
			return res.json({ username : resp.username });
		}
		else
			return res.json({});
	});
});

router.post('/', function(req, res, next) {
	server.db.collection('users').insertOne({ username: req.body.username, email: req.body.email, password: req.body.password}, (err, resp) => {
		if(err) throw err;
		console.log(req.body);
		if(resp.result.ok === 1)
		{
			let message = 'Account successfully created ! You can now safely login.'
			let status = 'success';
			res.render('index', {loggerMessage: message, loggerStatus: status});
		}
	});
});

module.exports = router;
