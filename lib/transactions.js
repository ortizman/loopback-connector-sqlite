/**
* Created by manuel.ortiz@fluxit.com.ar
*/

var async = require('async');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

module.exports = mixinTransactions;

function mixinTransactions(SQLiteDB) {

    var self = SQLiteDB;

    SQLiteDB.prototype.beginTransaction = (isolation, cb) => {
        var db = new TransactionDatabase(new sqlite3.Database(self.prototype.file_name, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE));
        return db.beginTransaction(cb);
    }

    SQLiteDB.prototype.rollback = (tx, cb) => tx.rollback(cb);

    SQLiteDB.prototype.commit = (tx, cb) => tx.commit(cb);
}