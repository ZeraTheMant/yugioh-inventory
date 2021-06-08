const async = require('async');
const { body, validationResult } = require('express-validator');
const MonsterType = require('../models/monster_type');
const MonsterCard = require('../models/monster_card');

exports.monster_type_list = function(req, res, next) {
	MonsterType.find()
		.exec(function (err, monster_types) {
			if (err) { return next(err); }
			
			const context = {
				title: 'Monster Type List',
				monster_types: monster_types
			};
			res.render('monster_type_list', context);
		});
};

exports.monster_type_detail = function(req, res, next) {
	async.parallel({
		monster_type: function(callback) {
			MonsterType.findById(req.params.id).exec(callback);
		},
		monsters_with_this_type: function(callback) {
			MonsterCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.monster_type==null) {
			const err = new Error('Monster type not found');
			err.status = 404;
			return next(err);
		}
		
		const context = {
			title: 'Monster Type Detail',
			monster_type: results.monster_type,
			monsters_with_this_type_count: 3//results.monsters_with_this_type
		}
		
		res.render('monster_type_detail', context);
	});
};

exports.monster_type_create_get = function(req, res, next) {
	res.render('monster_type_form', {title: 'Create Monster Type'});
};

exports.monster_type_create_post = [
    body('monster_type', 'Monster type name required').trim().isLength({min: 1}).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        
        const monster_type = new MonsterType({
            name: req.body.monster_type
        });
        
        if (!errors.isEmpty()) {
            const context = {
                title: 'Create Monster Type',
                monster_type: monster_type,
                errors: errors.array()
            };
            res.render('monster_type_form', context);
        } else {
            MonsterType.findOne({'name': req.body.monster_type})
                .exec(function (err, found_monster_type) {
                    if (err) { return next(err); }
                    
                    if (found_monster_type) {
                        res.redirect(found_monster_type.url);               
                    } else {
                        monster_type.save(function (err) {
                            if (err) { return next(err); }
                            res.redirect(monster_type.url);
                        });
                    }
                });
        }
    }
];

exports.monster_type_delete_get = function(req, res, next) {
	async.parallel({
		monster_type: function(callback) {
			MonsterType.findById(req.params.id).exec(callback);
		},
		monsters_with_this_type: function(callback) {
			MonsterCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.monster_type==null) {
			res.redirect('/monster_types');
		}
		
		const context = {
			title: 'Delete Monster Type',
			monster_type: results.monster_type,
			monsters_with_this_type: results.monsters_with_this_type
		};
		
		res.render('monster_type_delete', context);
	});
};

exports.monster_type_delete_post = function(req, res, next) {
	async.parallel({
		monster_type: function(callback) {
			MonsterType.findById(req.params.id).exec(callback);
		},
		monsters_with_this_type: function(callback) {
			MonsterCard.find({"type": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.monsters_with_this_type.length > 0) {
			const context = {
				title: 'Delete Monster Type',
				monster_type: results.monster_type,
				monsters_with_this_type: results.monsters_with_this_type
			};
			res.render('monster_type_delete', context);
		} else {
			MonsterType.findByIdAndRemove(req.body.monster_type_id, function(err) {
				if (err) { return next(err); }
				res.redirect('/monster_types');
			})
		}
	});
};

exports.monster_type_update_get = function(req, res, next) {
	MonsterType.findById(req.params.id)
		.exec(function(err, type_to_be_updated) {
			if (err) { return next(err); }
			
			const context = {
				title: 'Update Monster Type',
				monster_type: type_to_be_updated
			};
			res.render('monster_type_form', context);
		});
};

exports.monster_type_update_post = [
    body('monster_type', 'Monster type name required').trim().isLength({min: 1}).escape(),
	
	(req, res, next) => {
		const errors = validationResult(req);
		
		const monster_type = new MonsterType({
			name: req.body.monster_type,
			_id: req.params.id
		});
		
		if(!errors.isEmpty()) {
			const context = {
				title: 'Update Monster Type',
				monster_type: monster_type,
				errors: errors.array()
			};
			res.render('monster_type_form', context);
		} else {
			MonsterType.findOne({name: req.body.monster_type})
				.exec(function(err, found_monster_type) {
					if (err) { return next(err); }
					
					if (found_monster_type) {
						res.redirect(found_monster_type.url);
					} else {
						MonsterType.findByIdAndUpdate(req.params.id, monster_type, {}, function(err) {
							if (err) { return next(err); }
							res.redirect(monster_type.url);
						});
					}
				});
		}
	}
];