const Attribute = require('../models/attribute');


exports.index = function(req, res, next) {
	/*Attribute
		.find()
		.populate()
		.exec(function (err, attributes) {
			if (err) { return next(err); }
			const context = {
				title: 'Card Inventory',
				attributes: attributes
			};
			res.render('index', context);			
	});*/
	res.render('index', {title: 's'});	
};

