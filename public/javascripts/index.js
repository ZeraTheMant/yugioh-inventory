const cardSearchForm = document.querySelector('#card-search-form');

const cardTypeSelect = document.querySelector('#card-type');
const monsterCategorySelect = document.querySelector('#monster-category');
const attributeSelect = document.querySelector('#attrib');
const cardCategorySelect = document.querySelector('#card-category');

const levelFilterMinInput = document.querySelector('#level-filter-min');
const levelFilterMaxInput = document.querySelector('#level-filter-max');
const atkFilterMinInput = document.querySelector('#atk-filter-min');
const atkFilterMaxInput = document.querySelector('#atk-filter-max');
const defFilterMinInput = document.querySelector('#def-filter-min');
const defFilterMaxInput = document.querySelector('#def-filter-max');

const MonsterType = require('../../models/monster_type');
alert(MonsterType);

function monsterFieldsToggle(flag) {
	attributeSelect.disabled = flag;
	monsterCategorySelect.disabled = flag;
	
	levelFilterMinInput.disabled = flag;
	levelFilterMaxInput.disabled = flag;
	atkFilterMinInput.disabled = flag;
	atkFilterMaxInput.disabled = flag;
	defFilterMinInput.disabled = flag;
	defFilterMaxInput.disabled = flag;
}

function resetCardSearchForm() {
	//resets the entire form and disables buttons below the card section
	cardSearchForm.reset();
	cardTypeSelect.disabled = true;
	monsterFieldsToggle(true);
}

cardCategorySelect.addEventListener('change', (e) => {
	const selectedCardCategory = e.target.value;
	resetCardSearchForm();
	cardCategorySelect.value = selectedCardCategory;

	const cardCategories = ['Monster', 'Spell', 'Trap'];
	if(cardCategories.includes(selectedCardCategory)) {
		cardTypeSelect.disabled = false;
		if (selectedCardCategory == 'Monster') { 
			monsterFieldsToggle(false); 
		}
	}
});