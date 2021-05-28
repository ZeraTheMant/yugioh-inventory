const async = require('async');
const Attribute = require('../models/attribute');
const MonsterCategory = require('../models/monster_category');

exports.index = function(req, res, next) {
	/*Attribute
		.find()
		//.populate()
		.exec(function (err, attributes) {
			if (err) { return next(err); }
			const context = {
				title: 'Card Inventory',
				attributes: attributes
			};
			res.render('index', context);			
	});*/

	async.parallel({
		attributes: function(callback) {
			Attribute.find().exec(callback);
		},
		monster_categories: function(callback) {
			MonsterCategory.find().exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		const context = {
			title: 'Card Inventory',
			attributes: results.attributes,
			monster_categories: results.monster_categories
		};
		res.render('index', context);
	});
};

