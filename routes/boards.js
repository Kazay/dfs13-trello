var express = require('express');
var router = express.Router();
var server = require('../db');
var ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
	if(req.session.user) {
		server.db.collection('boards').find({ user_id: req.session.user._id}).sort({ title: 1 }).toArray((err, boards) => {
			if(err) throw err;
			if(boards)
			{
				return res.json({ boards : boards, user : req.session.user });
			}
			else
				return res.json({});
		})	
	}
	else {
		res.json({})
	}
})

router.post('/', function(req, res, next) {
	server.db.collection('boards').insertOne({ title: req.body.title, user_id: req.session.user._id }, (err, resp) => {
		if(err) throw err;
		console.log(req.body);
		if(resp.result.ok === 1)
		{
			let message = 'Board successfully created !';
			let status = 'success';
			res.render('index', {loggerMessage: message, loggerStatus: status});
		}
		else
		{
			let message = 'Cannot create your board, please retry.';
			let status = 'error';
			res.render('index', {loggerMessage: message, loggerStatus: status});
		}
	});
});

router.delete('/:id', function(req, res, next) {
	server.db.collection('boards').remove( {'_id': new ObjectId(req.params.id), 'user_id': req.session.user._id}, (err, resp) => {
		if(err) throw err;
		if(resp.result.ok === 1)
		{
			let message = 'Board successfully deleted !';
			let status = 'success';
			res.json({loggerMessage: message, loggerStatus: status});
		}
		else
		{
			let message = 'Cannot delete your board, please retry.';
			let status = 'error';
			res.json({loggerMessage: message, loggerStatus: status});
		}
	});
});

module.exports = router;