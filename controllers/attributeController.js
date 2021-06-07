const async = require('async');
const {body, validationResult} = require('express-validator');
const Attribute = require('../models/attribute');
const MonsterCard = require('../models/monster_card');

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
		},
		attribute_monsters_count: function(callback) {
			MonsterCard.find({"attribute": req.params.id}).exec(callback);
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
		monsters_with_this_attr: function(callback) {
			MonsterCard.find({"attribute": req.params.id}).exec(callback);//req.params.id		
		}		
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.attribute==null) {
            res.redirect('/attributes');
        }
        
        const context = {
            title: 'Delete Attribute',
			attribute: results.attribute,
			monsters_with_this_attr: results.monsters_with_this_attr
        };
        res.render('attribute_delete', context);
    });
};

exports.attribute_delete_post = function(req, res, next) {
	async.parallel({
		attribute: function(callback) {
			Attribute.findById(req.params.id).exec(callback);
		},
		monsters_with_this_attr: function(callback) {
			MonsterCard.find({"attribute": req.params.id}).exec(callback);//req.params.id
		}
	}, function (err, results) {
		if (err) { return next(err); }
		
		if (results.monsters_with_this_attr.length > 0) {
			const context = {
				title: 'Delete Attribute',
				attribute: results.attribute,
				monsters_with_this_attr: results.monster_with_this_attr
			};
			res.render('attribute_delete', context);
		} else {
			Attribute.findByIdAndRemove(req.body.attribute_id, function(err) {
				if (err) { return next(err); }				
				res.redirect('/attributes');
			});
		}
	});
};

exports.attribute_update_get = function(req, res, next) {
	Attribute.findById(req.params.id)
		.exec(function(err, attribute_to_be_updated) {
			if (err) { return next(err); }
			const context = {
				title: 'Update Attribute',
				attribute: attribute_to_be_updated
			};
			
			res.render('attribute_form', context);
		});
};

exports.attribute_update_post = [
	body('attribute', 'Attribute name required').trim().isLength({min:1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		var attribute = new Attribute({
			name: req.body.attribute,
			_id: req.params.id
		});
		
		if(!errors.isEmpty()) {
			const context = {
				title: 'Update Attribute',
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
						Attribute.findByIdAndUpdate(req.params.id, attribute, {}, function (err, the_attribute) {
							if (err) { return next(err); }
							res.redirect(attribute.url);
						});
					}
				}
			);
		}
	}
];
