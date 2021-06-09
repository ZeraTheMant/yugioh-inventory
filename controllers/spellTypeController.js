const async = require('async');
const { body, validationResult } = require('express-validator');
const SpellType = require('../models/spell_type');
const SpellCard = require('../models/spell_card');

exports.spell_type_list = function(req, res, next) {
	SpellType.find()
		.exec(function (err, spell_types) {
			if (err) { return next(err); }
		
			const context = {
				title: 'Spell Type List',
				spell_types: spell_types
			};
			res.render('spell_type_list', context);
		});
};

exports.spell_type_detail = function(req, res, next) {
	async.parallel({
		spell_type: function(callback) {
			SpellType.findById(req.params.id).exec(callback);
		},
		spell_cards_of_this_type: function(callback) {
			SpellCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.spell_type==null) {
			const err = new Error('Spell type not found');
			err.status = 404;
			return next(err);
		}
		
		const context = {
			title: 'Spell Type Detail',
			spell_type: results.spell_type,
			spell_cards_of_this_type_count: 2
		};
		
		res.render('spell_type_detail', context);
	});
};

exports.spell_type_create_get = function(req, res, next) {
	res.render('spell_type_form', {title: 'Create Spell Type'});
};

exports.spell_type_create_post = [
	body('spell_type', 'Spell type name required').trim().isLength({min: 1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		const spell_type = new SpellType({
			name: req.body.spell_type
		});
		
		if(!errors.isEmpty()) {
			const context = {
				title: 'Create Spell Type',
				spell_type: spell_type,
				errors: errors.array()
			};
			res.render('spell_type_form', context);
		} else {
			SpellType.findOne({'name': req.body.spell_type})
			.exec(function (err, found_spell_type) {
				if (err) { return next(err); }
				
				if (found_spell_type) {
					res.redirect(found_spell_type.url);
				} else {
					spell_type.save(function (err) {
						if (err) { return next(err) }
						res.redirect(spell_type.url);
					});
				}
			});
		}
	}
];

exports.spell_type_delete_get = function(req, res, next) {
	async.parallel({
		spell_type: function(callback) {
			SpellType.findById(req.params.id).exec(callback);
		},
		spell_cards_of_this_type: function(callback) {//req.params.id
			SpellCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.spell_type==null)
			res.redirect('/spell_types');
			
		const context = {
			title: 'Delete Spell Type',
			spell_type: results.spell_type,
			spell_cards_of_this_type: results.spell_cards_of_this_type
		};
		
		res.render('spell_type_delete', context);
	});
};

exports.spell_type_delete_post = function(req, res, next) {
	async.parallel({
		spell_type: function(callback) {
			SpellType.findById(req.params.id).exec(callback);
		}, 
		spell_cards_of_this_type: function(callback) {
			SpellCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.spell_cards_of_this_type.length > 0) {
			const context = {
				title: 'Delete Spell Type',
				spell_type: results.spell_type,
				spell_cards_of_this_type: results.spell_cards_of_this_type
			};
			res.render('spell_type_delete', context);
		} else {
			SpellType.findByIdAndRemove(req.body.spell_type_id, function(err) {
				if (err) { return next(err); }
				res.redirect('/spell_types');
			});
		}
	});
};

exports.spell_type_update_get = function(req, res, next) {
	SpellType.findById(req.params.id)
		.exec(function(err, spell_type_to_be_updated) {
			if (err) { return next(err); }
			 
			const context = {
				title: 'Update Spell Type',
				spell_type: spell_type_to_be_updated
			};
			
			res.render('spell_type_form', context);
		});
};

exports.spell_type_update_post = [
	body('spell_type', 'Spell type name required').trim().isLength({min: 1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		const spell_type = new SpellType({
			name: req.body.spell_type,
			_id: req.params.id
		});
		
		if (!errors.isEmpty()) {
			const context = {
				title: 'Update Spell Type',
				spell_type: spell_type,
				errors: errors.array()
			};
			
			res.render('spell_type_form', context);
		} else {
			SpellType.findOne({"name": req.body.spell_type})
				.exec(function(err, found_spell_type) {
				if (err) { return next(err); }
				
				if (found_spell_type) {
					res.redirect(found_spell_type.url);
				} else {
					SpellType.findByIdAndUpdate(req.params.id, spell_type, {}, (err) => {
						if (err) { return next(err); }
						res.redirect(spell_type.url);
					});
				}
			});
		}
	},
];