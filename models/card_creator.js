const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardCreator = (fields) => {
	const CardSchema = new Schema(fields);
	return mongoose.model('Card', CardSchema);
};

module.exports = cardCreator;