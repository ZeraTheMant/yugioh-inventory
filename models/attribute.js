var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttributeSchema = new Schema(
	{
		name: {type: String, required: true, minLength: 3, maxLength: 100}
	}
);

AttributeSchema
	.virtual('url')
	.get(function () {
		return '/attribute/' + this._id;
});

module.exports = mongoose.model('Attribute', AttributeSchema);