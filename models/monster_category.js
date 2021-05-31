var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonsterCategorySchema = new Schema(
	{
		name: {type: String, required: true, minLength: 3, maxLength: 100}
	}
);

MonsterCategorySchema
	.virtual('url')
	.get(function () {
		return '/monster_category/' + this._id;
});

module.exports = mongoose.model('MonsterCategory', MonsterCategorySchema);