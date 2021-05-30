const async = require('async');
const { body, validateResult } = require('express-validator');
const SpellType = require('../models/spell_type');

exports.spell_type_list = function(req, res) {
	res.send('spell type list not implemented');
};

exports.spell_type_detail = function(req, res) {
	res.send('spell type detail of ' + req.params.id +' not implemented');
};

exports.spell_type_create_get = function(req, res, next) {
	res.render('spell_type_form', {title: 'Create Spell Type'});
};

exports.spell_type_create_post = [

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