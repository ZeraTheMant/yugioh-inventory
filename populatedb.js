#! /usr/bin/env node

console.log('This script populates some test cards to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var MonsterCard = require('./models/monster_card');
var SpellCard = require('./models/spell_card');
var TrapCard = require('./models/trap_card');
var Attribute = require('./models/attribute');
var MonsterType = require('./models/monster_type');
var MonsterCategory = require('./models/monster_category');
var SpellType = require('./models/spell_type');
var TrapType = require('./models/trap_type');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var monster_cards = [];
var spell_cards = [];
var trap_cards = [];
var attributes = [];
var monster_types = [];
var monster_categories = [];
var spell_types = [];
var trap_types = [];

function monsterCardCreate(name, desc, img, type, attr, level, eff, atk, def, monster_class, cb) {
  monsterCardDetail = {
	name: name,
	description: desc,
	image: img,
	type: type,
	attribute: attr,
	level: level,
	is_effect: eff,
	atk: atk,
	def: def,
	monster_class: monster_class,
	card_category: 'Monster'
  };
  
  var monsterCard = new MonsterCard(monsterCardDetail);
       
  monsterCard.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Monster Card: ' + monsterCard);
    monster_cards.push(monsterCard)
    cb(null, monsterCard)
  }  );
}

function spellCardCreate(name, desc, img, type, eff, cb) {
  spellCardDetail = {
	name: name,
	description: desc,
	image: img,
	type: type,
	is_effect: eff,
	card_category: 'Spell'
  };
  
  var spellCard = new SpellCard(spellCardDetail);
       
  spellCard.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Spell Card: ' + spellCard);
    spell_cards.push(spellCard)
    cb(null, spellCard)
  }  );
}

function trapCardCreate(name, desc, img, type, eff, cb) {
  trapCardDetail = {
	name: name,
	description: desc,
	image: img,
	type: type,
	is_effect: eff,
	card_category: 'Trap'
  };
  
  var trapCard = new TrapCard(trapCardDetail);
       
  trapCard.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Trap Card: ' + trapCard);
    trap_cards.push(trapCard)
    cb(null, trapCard)
  });
}

function attributeCreate(name, cb) {
  attributeDetail = { name: name };
  const attribute = new Attribute(attributeDetail);
  
  attribute.save(function (err) {
    if (err) {
	  cb(err, null);
	  return;
	}
	console.log('New Attribute: ' + attribute);
	attributes.push(attribute);
	cb(null, attribute);
  });
}

function monsterTypeCreate(name, cb) {
  monsterTypeDetail = { name: name };
  const monsterType = new MonsterType(monsterTypeDetail);
  
  monsterType.save(function (err) {
    if (err) {
	  cb(err, null);
	  return;
	}
	console.log('New Monster Type: ' + monsterType);
	monster_types.push(monsterType);
	cb(null, monsterType);
  });
}

function monsterCategoryCreate(name, cb) {
  monsterCategoryDetail = { name: name };
  const monsterCategory = new MonsterCategory(monsterCategoryDetail);
  
  monsterCategory.save(function (err) {
    if (err) {
	  cb(err, null);
	  return;
	}
	console.log('New Monster Category: ' + monsterCategory);
	monster_categories.push(monsterCategory);
	cb(null, monsterCategory);
  });
}

function spellTypeCreate(name, cb) {
  spellTypeDetail = { name: name };
  const spellType = new SpellType(spellTypeDetail);
  
  spellType.save(function (err) {
    if (err) {
	  cb(err, null);
	  return;
	}
	console.log('New Spell Type: ' + spellType);
	spell_types.push(spellType);
	cb(null, spellType);
  });
}

function trapTypeCreate(name, cb) {
  trapTypeDetail = { name: name };
  const trapType = new TrapType(trapTypeDetail);
  
  trapType.save(function (err) {
	if (err) {
	  cb(err, null);
	  return;
	}
	console.log('New Trap Type: ' + trapType);
	trap_types.push(trapType);
	cb(null, trapType);
  });
}

function createMonsters(cb) {
    async.series([
        function(callback) {						
          monsterCardCreate('Seiyaryu', 'seiyaryu desc', 'seiyaryu img', 'Dragon', 'Light', 7, false, 2500, 2300, 'Normal', callback);
        },
        function(callback) {
		  monsterCardCreate('Meteor B. Dragon', 'mbd desc', 'mbd img', 'Dragon', 'Fire', 8, false, 3500, 2000, 'Fusion', callback);
        },
        function(callback) {
		  monsterCardCreate(
			'Dark Magician', 
			'The ultimate wizard in terms of attack and defense.', 
			'dark magician img', 
			'Spellcaster', 
			'Dark', 
			7, 
			false, 
			2500, 
			2100, 
			'Normal', 
			callback
		  );
        },
        ],
        // optional callback
        cb);
}


function createSpells(cb) {
    async.series([
        function(callback) {			
          spellCardCreate('Raigeki', "Destroy all monsters on your opponent's side of the field", 'raigeki img', 'Normal', true, callback);		
        },
        function(callback) {
		  spellCardCreate('Umi', "umi desc", 'umi img', 'Field', true, callback);
        },
        function(callback) {
		  spellCardCreate('Axe of Despair', "aod desc", 'aod img', 'Equip', true, callback);
        },
        ],
        // optional callback
        cb);
}


function createTraps(cb) {
    async.series([
        function(callback) {			
          trapCardCreate('Mirror Force', "mf desc", 'mf img', 'Normal', true, callback);		
        },
        function(callback) {
		  trapCardCreate('Spell Drain', "spell desc", 'spell img', 'Continuous', true, callback);
        },
        function(callback) {
		  trapCardCreate('Trap Jammer', "tj desc", 'tj img', 'Counter', true, callback);
        },
        ],
        // optional callback
        cb);
}

function createAttributes(cb) {
    async.series([
        function(callback) {			
          attributeCreate('Light', callback);		
        },
        function(callback) {
          attributeCreate('Dark', callback);	
        },
        function(callback) {
          attributeCreate('Water', callback);	
        },
        function(callback) {
          attributeCreate('Fire', callback);	
        },
        function(callback) {
          attributeCreate('Earth', callback);	
        },	
        function(callback) {
          attributeCreate('Wind', callback);	
        },
        function(callback) {
          attributeCreate('Divine', callback);	
        },		
        ],
        // optional callback
        cb);
}

function createMonsterTypes(cb) {
    async.series([
        function(callback) {			
          monsterTypeCreate('Aqua', callback);		
        },
        function(callback) {
          monsterTypeCreate('Dragon', callback);	
        },
        function(callback) {
          monsterTypeCreate('Divine-Beast', callback);	
        },
        function(callback) {
          monsterTypeCreate('Dinosaur', callback);	
        },
        function(callback) {
          monsterTypeCreate('Cyberse', callback);	
        },	
        function(callback) {
          monsterTypeCreate('Beast-Warrior', callback);	
        },
        function(callback) {
          monsterTypeCreate('Beast', callback);	
        },		
        function(callback) {			
          monsterTypeCreate('Fairy', callback);		
        },
        function(callback) {
          monsterTypeCreate('Fiend', callback);	
        },
        function(callback) {
          monsterTypeCreate('Fish', callback);	
        },
        function(callback) {
          monsterTypeCreate('Insect', callback);	
        },
        function(callback) {
          monsterTypeCreate('Machine', callback);	
        },	
        function(callback) {
          monsterTypeCreate('Plant', callback);	
        },
        function(callback) {
          monsterTypeCreate('Psychic', callback);
		},
        function(callback) {			
          monsterTypeCreate('Pyro', callback);		
        },
        function(callback) {
          monsterTypeCreate('Reptile', callback);	
        },
        function(callback) {
          monsterTypeCreate('Rock,', callback);	
        },
        function(callback) {
          monsterTypeCreate('Sea Serpent', callback);	
        },
        function(callback) {
          monsterTypeCreate('Spellcaster', callback);	
        },	
        function(callback) {
          monsterTypeCreate('Thunder', callback);	
        },
        function(callback) {
          monsterTypeCreate('Warrior', callback);	
        },		
        function(callback) {			
          monsterTypeCreate('Winged Beast', callback);		
        },
        function(callback) {
          monsterTypeCreate('Wyrm', callback);	
        },
        function(callback) {
          monsterTypeCreate('Zombie,', callback);	
        },		
        ],
        // optional callback
        cb);
}

function createMonsterCategories(cb) {
    async.series([
        function(callback) {			
          monsterCategoryCreate('Normal', callback);		
        },
        function(callback) {
          monsterCategoryCreate('Effect', callback);	
        },
        function(callback) {
          monsterCategoryCreate('Fusion', callback);	
        },
        function(callback) {
          monsterCategoryCreate('Ritual', callback);	
        },
        function(callback) {
          monsterCategoryCreate('Synchro', callback);	
        },	
        function(callback) {
          monsterCategoryCreate('Gemini', callback);	
        },
        function(callback) {
          monsterCategoryCreate('Pendulum', callback);	
        },		
        function(callback) {
          monsterCategoryCreate('Link', callback);	
        },			
        ],
        // optional callback
        cb);
}

function createSpellTypes(cb) {
	async.series([
	  function(callback) {
	    spellTypeCreate('Normal', callback);	
	  },
   	  function(callback) {
	    spellTypeCreate('Quick-Play', callback);
	  },
	  function(callback) {
	    spellTypeCreate('Equip', callback);
	  },	  
	  function(callback) {
	    spellTypeCreate('Field', callback);
	  },		
	  function(callback) {
	    spellTypeCreate('Ritual', callback);
	  },		  
	  function(callback) {
		spellTypeCreate('Continuous', callback);
	  }
	],
	cb);
}

function createTrapTypes(cb) {
	async.series([
	  function(callback) {
	    trapTypeCreate('Normal', callback);
	  },
	  function(callback) {
	    trapTypeCreate('Continuous', callback);
	  },
	  function(callback) {
	    trapTypeCreate('Counter', callback);
	  },	  
	],
	cb);
}

async.series([
    /*createMonsters,
    createSpells,
    createTraps,
	createAttributes,
	createMonsterTypes,
	createMonsterCategories*/
	createSpellTypes,
	createTrapTypes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Initial cards successfuly created!');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});