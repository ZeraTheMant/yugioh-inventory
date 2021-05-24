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
var MonsterCard = require('./models/monster_card')
var SpellCard = require('./models/spell_card')
var TrapCard = require('./models/trap_card')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var monster_cards = [];
var spell_cards = [];
var trap_cards = [];

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
  }  );
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


async.series([
    createMonsters,
    createSpells,
    createTraps
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