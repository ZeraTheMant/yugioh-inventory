var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrapTypeSchema = new Schema(
	{
		name: {type: String, required: true, minLength: 3, maxLength: 100}
	}
);

TrapTypeSchema
	.virtual('url')
	.get(function () {
		return '/trap_type/' + this._id;
});

module.exports = mongoose.model('TrapType', TrapTypeSchema);