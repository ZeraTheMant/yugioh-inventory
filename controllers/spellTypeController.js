const async = require('async');
const { body, validationResult } = require('express-validator');
const SpellType = require('../models/spell_type');

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

exports.spell_type_detail = function(req, res) {
	res.send('spell type detail of ' + req.params.id +' not implemented');
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

exports.spell_type_delete_get = function(req, res) {
	res.send('spell type delete get not implemented');
};

exports.spell_type_delete_post = function(req, res) {
	res.send('spell type delete post not implemented');
};

exports.spell_type_update_get = function(req, res) {
	res.send('spell type update get not implemented');
};

exports.spell_type_update_post = function(req, res) {
	res.send('spell type update post not implemented');
};