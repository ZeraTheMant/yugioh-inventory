const levelSelect = document.querySelector('#level');
const atkPoints = document.querySelector('#atk-points');
const defPoints = document.querySelector('#def-points');

function monsterFieldsToggle(flag) {
	levelSelect.disabled = flag;
	atkPoints.disabled = flag;
	defPoints.disabled = flag;
}
