'use strict';

var mongoose = require('mongoose');

require('../models/bizProfileModel');
require('../models/prodProfileModel');

mongoose.Promise = global.Promise;

var BizProfile = mongoose.model('bizProfile');
var ProductProfile = mongoose.model('prodProfile');

// --- result handler for result obtained from db.
function handleResult(err, res, bizs){
	if (err) {
		console.log(err);
			return res.status(500).json({'message': 'error occured'});
		}

	return res.json(bizs);
}

exports.listByQuery = (req, res) => {

	var searchObj = {
			'city': req.body.city,
			'area': req.body.area,
			// 'category': category,
			'products': req.body.product
		}

	if (!searchObj.products) return res.status(422).json({'message': 'unprocessable entity'});
	ProductProfile.findOne({name: searchObj.products}).select('category').exec()
		.then(category => {
			// searchObj.category = category;
			BizProfile.find(
				searchObj,
				/*{_id:0,__v:0},*/
				(err, bizs) => { return handleResult(err, res, bizs); }
			); 
		});
}