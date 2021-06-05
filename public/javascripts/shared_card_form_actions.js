const cardSearchForm = document.querySelector('form');

const cardTypeSelect = document.querySelector('#card-type');
const monsterCategorySelect = document.querySelector('#monster-category');
const attributeSelect = document.querySelector('#attrib');
const cardCategorySelect = document.querySelector('#card-category');
const levelSelect = (!(document.querySelector('#level')==null)) ? document.querySelector('#level') : null;

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

function resetCardSearchForm() {
	//resets the entire form and disables buttons below the card section
	cardSearchForm.reset();
	cardTypeSelect.disabled = true;
	monsterFieldsToggle(true);
	attributeSelect.options.length = 0;
	monsterCategorySelect.options.length = 0;
	
	if (levelSelect)
		levelSelect.options.length = 0;
}

const levelObj = [];
for (var i=1; i<13; i++) {
	levelObj.push({name: i});
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
			if (levelSelect)
				loadSelect(levelObj, levelSelect);
		}
	}
	loadTypeSelect(selectedCardCategory);
});
