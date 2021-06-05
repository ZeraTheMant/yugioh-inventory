const { body } = require('express-validator');

function validatorAndSanitizer(field, errorMsg) {
	return body(field, errorMsg).trim().isLength({min: 1}).escape();
}

module.exports = validatorAndSanitizer;