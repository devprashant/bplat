'use strict';

var express = require('express');
var router = express.Router();
var bizProfile = require('../controller/bizProfileListController');

module.exports = (app) => {

	router.route('/search')
			.post(bizProfile.listByQuery);

	app.use('/api/', router);
}