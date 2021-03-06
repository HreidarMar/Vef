'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {title: 'Netdagbókin', user: '', sidebar: 'true'};
	if(req.session.user) {
		data.user = req.session.user;
	}

	res.render('index', data);
});

router.get('/restricted', function(req, res, next) {
	var data = {};

	data.message = 'Þú er ekki skráð/ur inn';
	data.title = 'Netdagbókin';
	data.sidebar = true;

	res.render('index', data);
});

module.exports = router;
