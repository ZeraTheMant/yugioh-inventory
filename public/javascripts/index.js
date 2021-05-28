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
	attributeSelect.options.length = 0;
	monsterCategorySelect.options.length = 0;
}

function loadTypeSelect(selectedCardCategory) {
	cardTypeSelect.options.length = 0;
	let card_type_obj;
	
	switch(selectedCardCategory) {
		case 'Monster':
			card_type_obj = monsterTypesObj;
			break;
		case 'Spell':
			card_type_obj = spellTypesObj;
			break;
		case 'Trap':
			card_type_obj = trapTypesObj;
			break;
	}
	
	loadSelect(card_type_obj, cardTypeSelect);
}

function loadSelect(sourceObj, selectDom) {
	selectDom.options.length = 0;
	sourceObj.forEach(item => {
		const option = createOption(item);
		selectDom.appendChild(option);
	});
}

function createOption(sourceObj) {
	const option = document.createElement('option');
	option.textContent = sourceObj.name;
	option.value = sourceObj.name;	
	return option;
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
			loadSelect(attributesObj, attributeSelect);
			loadSelect(monsterCategoriesObj, monsterCategorySelect);			
		}
	}
	loadTypeSelect(selectedCardCategory);
});
