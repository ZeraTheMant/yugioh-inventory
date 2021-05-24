const {monsterCardConstructor} = require('../model_constructors/model_constructors');
const cardCreator = require('./card_creator');

const monsterCardObj = monsterCardConstructor();
const MonsterCard = cardCreator(monsterCardObj);

module.exports = MonsterCard;
