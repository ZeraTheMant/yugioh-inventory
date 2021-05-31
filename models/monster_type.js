var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonsterTypeSchema = new Schema(
	{
		name: {type: String, required: true, minLength: 3, maxLength: 100}
	}
);

MonsterTypeSchema
	.virtual('url')
	.get(function () {
		return '/monster_type/' + this._id;
});

module.exports = mongoose.model('MonsterType', MonsterTypeSchema);