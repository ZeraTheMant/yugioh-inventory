const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const {monsterCardConstructor, spellCardConstructor, trapCardConstructor} = require('./model_constructors');
const {spellCardConstructor} = require('./model_constructors');


const cardCreator = (fields) => {
	const CardSchema = new Schema(fields);
	return mongoose.model('Card', CardSchema);
};

const j = spellCardConstructor();
const x = cardCreator(j);
const z = new x({
	name: 'Raigeki',
	description: 'destroy',
	image: 'img of card',
	card_category: 'Monster',
	type: 'Normal',
	is_effect: true
});
console.log(z);


/*const redred = MonsterCard(
	'Redred',
	'The big one',
	'rered img',
	'Divine Beast',
	'Divine',
	'9001',
	false
);

console.log(redred.getName());
console.log(redred.getCardCategory());
console.log(redred.getDesc());
console.log(redred.getImg());
console.log(redred.getType());
console.log(redred.getLevel());
console.log(redred.getAttr());
console.log(redred.is_effect);

console.log()
console.log()

const umi = SpellCard(
	'Umi',
	'big blue sea',
	'umi img',
	'Normal'
);

console.log(umi.getName());
console.log(umi.getCardCategory());
console.log(umi.getDesc());
console.log(umi.getImg());
console.log(umi.getType());
console.log(umi.is_effect);


console.log()
console.log()



const traphole = TrapCard(
	'Trap Hole',
	'destroy monster',
	'trap hole img',
	'Continuous'
);

console.log(traphole.getName());
console.log(traphole.getCardCategory());
console.log(traphole.getDesc());
console.log(traphole.getImg());
console.log(traphole.getType());
console.log(traphole.is_effect);*/