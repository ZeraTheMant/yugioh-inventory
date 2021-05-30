const async = require('async');
const { body, validationResult } = require('express-validator');
const MonsterType = require('../models/monster_type');

exports.monster_type_list = function(req, res) {
	res.send('monster type list not implemented');
};

exports.monster_type_detail = function(req, res) {
	res.send('monster type detail of ' + req.params.id +' not implemented');
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

exports.monster_type_delete_get = function(req, res) {
	res.send('monster type delete get not implemented');
};

exports.monster_type_delete_post = function(req, res) {
	res.send('monster type delete post not implemented');
};

exports.monster_type_update_get = function(req, res) {
	res.send('monster type update get not implemented');
};

exports.monster_type_update_post = function(req, res) {
	res.send('monster type update post not implemented');
};