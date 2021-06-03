const async = require('async');
const Attribute = require('../models/attribute');
const MonsterCategory = require('../models/monster_category');
const MonsterType = require('../models/monster_type');
const SpellType = require('../models/spell_type');
const TrapType = require('../models/trap_type');

exports.index = function(req, res, next) {
	async.parallel({
		attributes: function(callback) {
			Attribute.find().exec(callback);
		},
		monster_categories: function(callback) {
			MonsterCategory.find().exec(callback);
		},
		monster_types: function(callback) {
			MonsterType.find().exec(callback);
		},
		spell_types: function(callback) {
			SpellType.find().exec(callback);
		},
		trap_types: function(callback) {
			TrapType.find().exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }

		const context = {
			title: 'Card Inventory',
			attributes: results.attributes,
			monster_categories: results.monster_categories,
			monster_types: results.monster_types,
			spell_types: results.spell_types,
			trap_types: results.trap_types
		};
		res.render('index', context);
	});
};

exports.card_create_get = function(req, res, next) {
	res.render('card_form', {title: 'Create Card'});
};

exports.card_create_post = function(req, res, next) {
	res.send('card create post');
};

exports.card_delete_get = function(req, res, next) {
	res.send('card delete get');
};

exports.card_delete_post = function(req, res, next) {
	res.send('card delete post');
};

exports.card_update_get = function(req, res, next) {
	res.send('card update get');
};

exports.card_update_post = function(req, res, next) {
	res.send('card update post');
};

exports.card_detail = function(req, res, next) {
	res.send('card detail');
};

exports.card_list = function(req, res, next) {
	res.send('card list');
}
