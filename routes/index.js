var express = require('express');
var router = express.Router();

const attribute_controller = require('../controllers/attributeController');
const monster_category_controller = require('../controllers/monsterCategoryController');
const monster_type_controller = require('../controllers/monsterTypeController');
const spell_type_controller = require('../controllers/spellTypeController');
const trap_type_controller = require('../controllers/trapTypeController');
const monster_card_controller = require('../controllers/monsterCardController');
const spell_card_controller = require('../controllers/spellCardController');
const trap_card_controller = require('../controllers/trapCardController');
const all_cards_controller = require('../controllers/allCardsController');


/* index page. */
router.get('/', function(req, res, next) {
	res.render('index', all_cards_controller.index);
});

// attribute routes start //
router.get('/attribute/create', attribute_controller.attribute_create_get);
router.post('/attribute/create', attribute_controller.attribute_create_post);

router.get('/attribute/:id/delete', attribute_controller.attribute_delete_get);
router.post('/attribute/:id/delete', attribute_controller.attribute_delete_post);

router.get('/attribu
// attribute routes end //

module.exports = router;
