var express = require('express');
var router = express.Router();
var server = require('../db');

router.get('/:id', (req, res) => {
	res.render('cards');
})

module.exports = router;