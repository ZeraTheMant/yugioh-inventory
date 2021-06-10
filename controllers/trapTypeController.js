const async = require('async');
const { body, validationResult } = require('express-validator');
const TrapType = require('../models/trap_type');
const TrapCard = require('../models/trap_card');

exports.trap_type_list = function(req, res, next) {
	TrapType.find()
		.exec(function (err, trap_types) {
			if (err) { return next(err) }
		
			const context = {
				title: 'Trap Type List',
				trap_types: trap_types
			}
			res.render('trap_type_list', context);
		});
};

exports.trap_type_detail = function(req, res, next) {
	async.parallel({
		trap_type: function(callback) {
			TrapType.findById(req.params.id).exec(callback);
		},
		trap_cards_of_this_type: function(callback) {
			TrapCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.trap_type==null) {
			const err = new Error('Trap type not found');
			err.status = 404;
			return next(err);
		} 
		
		const context = {
			title: 'Trap Type Detail',
			trap_type: results.trap_type,
			trap_cards_of_this_type_count: 1987
		};
		
		res.render('trap_type_detail', context);
	});
};

exports.trap_type_create_get = function(req, res, next) {
	res.render('trap_type_form', {title: 'Create Trap Type'});
};

exports.trap_type_create_post = [
	body('trap_type', 'Trap type name required').trim().isLength({min: 1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		const trap_type = new TrapType({
			name: req.body.trap_type
		});
		
		if(!errors.isEmpty()) {
			const context = {
				title: 'Create Trap Type',
				trap_type: trap_type,
				errors: errors.array()
			};
			res.render('trap_type_form', context);
		} else {
			TrapType.findOne({'name': req.body.trap_type})
				.exec(function (err, found_trap_type) {
					if (found_trap_type) {
						res.redirect(found_trap_type.url);
					} else {
						trap_type.save(function (err) {
							if (err) { return next(err); }
							res.redirect(trap_type.url);
						});
					}
				});
		}
	}
]

exports.trap_type_delete_get = function(req, res, next) {
	async.parallel({
		trap_type: function(callback) {
			TrapType.findById(req.params.id).exec(callback);
		},
		trap_cards_of_this_type: function(callback) {//"Normal"
			TrapCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.trap_type==null)
			res.redirect('/trap_types');
			
		const context = {
			title: 'Delete Trap Type',
			trap_type: results.trap_type,
			trap_cards_of_this_type: results.trap_cards_of_this_type
		};
		
		res.render('trap_type_delete', context);
	});
};

exports.trap_type_delete_post = function(req, res) {
	res.send('trap type delete post not implemented');
};

exports.trap_type_update_get = function(req, res) {
	res.send('trap type update get not implemented');
};

exports.trap_type_update_post = function(req, res) {
	res.send('trap type update post not implemented');
};