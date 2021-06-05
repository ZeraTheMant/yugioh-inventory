const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardCreator = (fields, alias) => {
	const CardSchema = new Schema(fields);
	
	CardSchema
		.virtual('url')
		.get(function () {
			return '/card/' + this._id;
	});
		
	return mongoose.model(alias, CardSchema);
};

module.exports = cardCreator;