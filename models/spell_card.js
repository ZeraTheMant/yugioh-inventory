const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema');
const Card = require('card');

const SpellCardSchema = extendSchema(Card, {});

module.exports = mongoose.model('SpellCard', SpellCardSchema);