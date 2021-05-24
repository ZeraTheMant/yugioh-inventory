const cardConstructor = () => {	
	const content = {
		name: {type: String, required: true},
		description: {type: String, required: true},
		image: {type: String, required: true},
		card_category: {type: String, required: true},
		type: {type: String, required: true},
		is_effect: {type: Boolean, required: true}
	};
	
	return content;
};

const monsterCardConstructor = () => {
	const prototype_instance = cardConstructor();

	const content = {
		level: {type: Number, required: true},
		attribute: {type: String, min: 1, max: 12, required: true},
		atk: {type: Number, min: 0, required: true},
		def: {type: Number, min: 0, required: true},
		monster_class: {type: String, required: true}	
	}
	
	return Object.assign({}, prototype_instance, content);
};

const spellCardConstructor = () => {
	return cardConstructor();
}; 

const trapCardConstructor = () => {
	return cardConstructor();
}; 

module.exports = {monsterCardConstructor, spellCardConstructor, trapCardConstructor};
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