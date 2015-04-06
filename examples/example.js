/**
* Created by tushar-chauhan on 6-Apr-2015
*/

var DataSource = require('loopback-datasource-juggler').DataSource;
var db = new DataSource(require('../index'), {
  file_name: 'dev.sqlite3',
  debug: false
});

var model = {
  'name': {'type': 'string', 'required': true},
  'universe': {'type': 'string'}
};

var Superhero = db.define('Superhero', model);

var heroes = [
  {name: 'Batman', universe: 'DC'},
  {name: 'The Hulk', universe: 'Marvel Comics'},
  {name: 'Green Arrow', universe: 'DC'},
  {name: 'Superman', universe: 'DC'},
  {name: 'Aquaman', universe: 'DC'},
];

// Migrate
db.automigrate(function(){
  // CREATE
  Superhero.create(heroes, function(err, h){
    if(err){
      console.log(err);
    } else {
      console.log("Created: ", h);
      // FIND
      Superhero.find({where: {universe: 'DC'}}, function(err, arr){
        console.log("\nFound : %j\n\nUpdated: ", arr);
        for(var i=0; i < arr.length; i++) {
          // UPDATE
          arr[i].updateAttributes({universe: 'DC Comics'}, function(err, data){
            console.log(data);
          });
        }
      });
    }
  });
});
