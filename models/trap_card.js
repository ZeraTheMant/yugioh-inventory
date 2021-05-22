const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema');
const Card = require('card');

const TrapCardSchema = extendSchema(Card, {});

module.exports = mongoose.model('TrapCard', TrapCardSchema);