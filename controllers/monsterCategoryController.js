const async = require('async');
const { body, validationResult } = require('express-validator');
const MonsterCategory = require('../models/monster_category');
const MonsterCard = require('../models/monster_card');

exports.monster_category_list = function(req, res) {
	MonsterCategory.find()
		.exec(function (err, monster_categories) {
			if (err) { return next(err); }
			
			const context = {
				title: 'Monster Category List',
				monster_categories: monster_categories
			};
			
			res.render('monster_category_list', context);
		});
};

exports.monster_category_detail = function(req, res, next) {
	async.parallel({
		monster_category: function(callback) {
			MonsterCategory.findById(req.params.id).exec(callback);
		},
		monsters_under_this_category: function(callback) {
			MonsterCard.find({"monster_class": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.monster_category==null) {
			var err = new Error('Monster category not found.');
			err.status = 404;
			return next(err);
		}
		
		const context = {
			title: 'Monster Category Detail',
			monster_category: results.monster_category,
			monsters_under_this_category_count: 4//results.monsters_under_this_category
		};
		res.render('monster_category_detail', context);
	});
};

exports.monster_category_create_get = function(req, res, next) {
	res.render('monster_category_form', {title: 'Create Monster Category'});
};

exports.monster_category_create_post = [
    body('monster_category', 'Monster category name required').trim().isLength({min: 1}).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        
        const monster_category = new MonsterCategory({
            name: req.body.monster_category
        });
        
        if(!errors.isEmpty()) {
            const context = {
                title: 'Create Monster Category',
                monster_category: monster_category,
                errors: errors.array()
            };
            res.render('monster_category_form', context);
        } else {
            MonsterCategory.findOne({'name': req.body.monster_category})
                .exec(function (err, found_monster_category) {
                    if (err) { return next(err); }
                    
                    if (found_monster_category) {
                        res.redirect(found_monster_category.url)
                    } else {
                        monster_category.save(function (err) {
                            if (err) { return next(err); }
                            
                            res.redirect(monster_category.url)
                        });
                    }
                });
        }
        
    }
];

exports.monster_category_delete_get = function(req, res, next) {
	async.parallel({
		monster_category: function(callback) {
			MonsterCategory.findById(req.params.id).exec(callback);
		},
		monsters_under_this_category: function(callback) {//req.params.id
			MonsterCard.find({"monster_class": req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if (err) { return next(err); }
		
		if (results.monster_category==null) {
			res.redirect('/monster_categories');
		}
		
		const context = {
			title: 'Delete Monster Category',
			monster_category: results.monster_category,
			monsters_under_this_category: results.monsters_under_this_category
		};
		res.render('monster_category_delete', context);
	});
};

exports.monster_category_delete_post = [
	body('monster_category_id', 'Monster category name required').trim().isLength({min: 1}).escape(),
];

exports.monster_category_update_get = function(req, res) {
	res.send('monster category update get not implemented');
};

exports.monster_category_update_post = function(req, res) {
	res.send('monster category update post not implemented');
};