const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema');
const Card = require('card');

const MonsterCardSchema = extendSchema(Card, {
	level: {type: Number, required: true},
	attribute: {type: String, min: 1, max: 12, required: true}
});

module.exports = mongoose.model('MonsterCard', MonsterCardSchema);