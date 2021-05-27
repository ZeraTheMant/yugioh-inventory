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
router.get('/', all_cards_controller.index);




// attribute routes start //
router.get('/attribute/create', attribute_controller.attribute_create_get);
router.post('/attribute/create', attribute_controller.attribute_create_post);

router.get('/attribute/:id/delete', attribute_controller.attribute_delete_get);
router.post('/attribute/:id/delete', attribute_controller.attribute_delete_post);

router.get('/attribute/:id/update', attribute_controller.attribute_update_get);
router.post('/attribute/:id/update', attribute_controller.attribute_update_post);

router.get('/attribute/:id', attribute_controller.attribute_detail);
router.get('/attributes/', attribute_controller.attribute_list);
// attribute routes end //




// monster category routes start //
router.get('/monster_category/create', monster_category_controller.monster_category_create_get);
router.post('/monster_category/create', monster_category_controller.monster_category_create_post);

router.get('/monster_category/:id/delete', monster_category_controller.monster_category_delete_get);
router.post('/monster_category/:id/delete', monster_category_controller.monster_category_delete_post);

router.get('/monster_category/:id/update', monster_category_controller.monster_category_update_get);
router.post('/monster_category/:id/update', monster_category_controller.monster_category_update_post);

router.get('/monster_category/:id', monster_category_controller.monster_category_detail);
router.get('/monster_categories/', monster_category_controller.monster_category_list);
// monster category routes end //




// monster type routes start //
router.get('/monster_type/create', monster_type_controller.monster_type_create_get);
router.post('/monster_type/create', monster_type_controller.monster_type_create_post);

router.get('/monster_type/:id/delete', monster_type_controller.monster_type_delete_get);
router.post('/monster_type/:id/delete', monster_type_controller.monster_type_delete_post);

router.get('/monster_type/:id/update', monster_type_controller.monster_type_update_get);
router.post('/monster_type/:id/update', monster_type_controller.monster_type_update_post);

router.get('/monster_type/:id', monster_type_controller.monster_type_detail);
router.get('/monster_types/', monster_type_controller.monster_type_list);
// monster type routes end //




// monster card routes start //
router.get('/monster_type/create', monster_type_controller.monster_type_create_get);
router.post('/monster_type/create', monster_type_controller.monster_type_create_post);

router.get('/monster_type/:id/delete', monster_type_controller.monster_type_delete_get);
router.post('/monster_type/:id/delete', monster_type_controller.monster_type_delete_post);

router.get('/monster_type/:id/update', monster_type_controller.monster_type_update_get);
router.post('/monster_type/:id/update', monster_type_controller.monster_type_update_post);

router.get('/monster_type/:id', monster_type_controller.monster_type_detail);
router.get('/monster_cards/', monster_type_controller.monster_type_list);
// monster card routes end //

module.exports = router;
