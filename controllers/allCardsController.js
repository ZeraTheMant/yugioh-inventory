const async = require('async');
const Attribute = require('../models/attribute');
const MonsterCategory = require('../models/monster_category');
const MonsterType = require('../models/monster_type');
const SpellType = require('../models/spell_type');
const TrapType = require('../models/trap_type');
const MonsterCard = require('../models/monster_card');
const SpellCard = require('../models/spell_card');
const TrapCard = require('../models/trap_card');


const { body, validationResult } = require('express-validator');
const validatorAndSanitizer = require('../public/javascripts/validatorAndSanitizer');

function successRenderFunction(res, next, title, view, errors=null) {
	return function(err, results) {
		if (err) { return next(err); }

		const context = {
			title: title,
			attributes: results.attributes,
			monster_categories: results.monster_categories,
			monster_types: results.monster_types,
			spell_types: results.spell_types,
			trap_types: results.trap_types,
			errors: errors
		};
		res.render(view, context);
	}
}

const card_info_obj = {
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
};

exports.index = function(req, res, next) {
	async.parallel(card_info_obj, successRenderFunction(res, next, 'Card Inventory', 'index'));
};

exports.card_create_get = function(req, res, next) {
	async.parallel(card_info_obj, successRenderFunction(res, next, 'Create Card', 'card_form'));
};

function dog() {
	const a = body('card_type').escape();
	console.log(a)
	return a;
}

exports.card_create_post = [
	body('card_category').escape(),
	validatorAndSanitizer('card_name', 'Card name must not be empty.'),
	validatorAndSanitizer('description', 'Card description must not be empty.'),
	/*body('card_type').escape(),
	body('attrib').escape(),
	body('level').escape(),
	validatorAndSanitizer('atk_points', 'Attack points must not be empty.'),	
	validatorAndSanitizer('def_points', 'Defense points must not be empty.'),*/
	
	(req, res, next) => {
		const errors = validationResult(req);		
		const category = req.body.card_category;
		
		let cardClass;
		let cardInfo = {
			name: req.body.card_name,
			description: req.body.description,
			card_category: category,
			type: req.body.card_type,
			image: 'test image'
		};
		
		if (category == 'Monster') {
			cardClass = MonsterCard;
			cardInfo.attribute = req.body.attrib;
			cardInfo.level = req.body.level;
			cardInfo.monster_class = req.body.monster_category;
			cardInfo.atk = req.body.atk_points;
			cardInfo.def = req.body.def_points;
		}else if (category == 'Spell') {
			cardClass = SpellCard;
		} else {
			cardClass = TrapCard;
		}
		
		const new_card = new cardClass(cardInfo);
		
		if(!errors.isEmpty()) {
			console.log('error');
			async.parallel(card_info_obj, successRenderFunction(res, next, 'Create Card', 'card_form', errors.array()));
		} else {
			new_card.save(function (err) {
				if (err) { return next(err); }
				console.log(new_card.url);
				res.redirect(new_card.url);
			});
		}		
	}
];

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
