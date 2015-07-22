/**
 * Created by tushar-chauhan on 13-Mar-2015
 */

require('./init');
var expect = require('chai').expect;

var User, User2, db, db2;

describe("SQLite multi-file test", function(){

  before('Create connection and User2 model definition', function () {
    db  = getDataSource();
    db2 = getDataSource2();

    User = db.define('User', {
      id: {type: Number, id: true},
      name: { type: String },
      email: { type: String }
    });
    User2 = db2.define('User2', {
      id: {type: Number, id: true},
      new_name: { type: String }
    });

  });

  it('should allow multiple database files', function (done) {

    db.automigrate('User', function () {
      db2.automigrate('User2', function () {
        done();
      });
    });

  });

});
