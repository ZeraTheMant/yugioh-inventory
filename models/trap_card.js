const {trapCardConstructor} = require('../model_constructors/model_constructors');
const cardCreator = require('./card_creator');

const trapCardObj = trapCardConstructor();
const TrapCard = cardCreator(trapCardObj);

module.exports = TrapCard;
