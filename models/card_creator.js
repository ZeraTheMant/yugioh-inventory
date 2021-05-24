const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardCreator = (fields, alias) => {
	const CardSchema = new Schema(fields);
	return mongoose.model(alias, CardSchema);
};

module.exports = cardCreator;