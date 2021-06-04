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
