const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
	{
		name: {type: String, required: true},
		description: {type: String, required: true}.
		image: {type: String, required: true},
		card_category: {type: String, required: true},
		type: {type: String, required: true},
		is_effect: {type: Boolean, required: true}
	}
);

module.exports = mongoose.model('Card', CardSchema);