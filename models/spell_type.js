var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpellTypeSchema = new Schema(
	{
		name: {type: String, required: true, minLength: 3, maxLength: 100}
	}
);

SpellTypeSchema
	.virtual('url')
	.get(function () {
		return '/spell_type/' + this._id;
});

module.exports = mongoose.model('SpellType', SpellTypeSchema);