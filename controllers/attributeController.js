const async = require('async');
const {body, validationResult} = require('express-validator');
const Attribute = require('../models/attribute');

exports.attribute_list = function(req, res, next) {
	Attribute.find()
		.exec(function (err, attributes) {
			if (err) { return next(err); }
			res.render('attribute_list', {title: 'Attribute List', attribute_list: attributes});
		});
};

exports.attribute_detail = function(req, res, next) {
	async.parallel({
		attribute: function(callback) {
			Attribute.findById(req.params.id)
				.exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.attribute==null) {
			var err = new Error('Attribute not found');
			err.status = 404;
			return next(err);
		}
		
		const context = {
			title: 'Attribute Detail',
			attribute: results.attribute,
			attribute_monsters_count: 5
		}
		res.render('attribute_detail', context);
	});
};

exports.attribute_create_get = function(req, res, next) {
	res.render('attribute_form', {title: 'Create Genre'});
};

exports.attribute_create_post = [
	body('attribute', 'Attribute name required').trim().isLength({min:1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		var attribute = new Attribute({
			name: req.body.attribute
		});
		
		if(!errors.isEmpty()) {
			const context = {
				title: 'Create Attribute',
				attribute: attribute,
				errors: errors.array()
			};
			res.render('attribute_form', context);
		} else {
			Attribute.findOne({'name': req.body.attribute})
				.exec(function(err, found_attribute) {
					if (err) { return next(err); }
					
					if (found_attribute) {
						res.redirect(found_attribute.url);
					} else {
						attribute.save(function (err) {
							if (err) { return next(err); }
							res.redirect(attribute.url);
						});
					}
				}
			);
		}
	}
];

exports.attribute_delete_get = function(req, res, next) {
	async.parallel({
        attribute: function(callback) {
            Attribute.findById(req.params.id).exec(callback);
        },	      
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.attribute==null) {
            res.redirect('/attributes');
        }
        
        const context = {
            title: 'Delete Attribute',
			attribute: results.attribute,
        };
        res.render('attribute_delete', context);
    });
};

exports.attribute_delete_post = function(req, res) {
	res.send('attribute delete post not implemented tests');
};

exports.attribute_update_get = function(req, res) {
	res.send('attribute update get not implemented');
};

exports.attribute_update_post = function(req, res) {
	res.send('attribute update post not implemented');
};
