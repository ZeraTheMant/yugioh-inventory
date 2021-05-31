const async = require('async');
const { body, validationResult } = require('express-validator');
const TrapType = require('../models/trap_type');

exports.trap_type_list = function(req, res) {
	res.send('trap type list not implemented');
};

exports.trap_type_detail = function(req, res) {
	res.send('trap type detail of ' + req.params.id +' not implemented');
};

exports.trap_type_create_get = function(req, res, next) {
	res.render('trap_type_form', {title: 'Create Trap Type'});
};

exports.trap_type_create_post = function(req, res) {
	res.send('trap type create post not implemented');
};

exports.trap_type_delete_get = function(req, res) {
	res.send('trap type delete get not implemented');
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