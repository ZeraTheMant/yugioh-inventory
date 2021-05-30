const asyn = require('async');
const { body, validationResult } = require('express-validator');
const MonsterCategory = require('../models/monster_category');

exports.monster_category_list = function(req, res) {
	res.send('monster category list not implemented');
};

exports.monster_category_detail = function(req, res) {
	res.send('monster category detail of ' + req.params.id +' not implemented');
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
	res.render('monster_category_form', {title: 'Create Monster Category'});
};

exports.monster_category_delete_post = function(req, res) {
	res.send('monster category delete post not implemented');
};

exports.monster_category_update_get = function(req, res) {
	res.send('monster category update get not implemented');
};

exports.monster_category_update_post = function(req, res) {
	res.send('monster category update post not implemented');
};