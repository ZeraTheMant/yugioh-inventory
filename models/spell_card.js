const {spellCardConstructor} = require('../model_constructors/model_constructors');
const cardCreator = require('./card_creator');

const spellCardObj = spellCardConstructor();
const SpellCard = cardCreator(spellCardObj, 'SpellCard');

module.exports = SpellCard;
