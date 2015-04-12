/**
* Created by tushar-chauhan on 13-Mar-2015
*/

var sqlite3 = require('sqlite3');
var SQLiteDB = require('./sqlite3db');
var debug = require('debug')('loopback:connector:sqlite');

/**
 * Initialize the SQLite connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {
  if (!sqlite3) {
    return;
  }

  var dbSettings = dataSource.settings || {};
  var connector = new SQLiteDB(sqlite3, dbSettings);
  dataSource.connector = connector;
  dataSource.connector.dataSource = dataSource;
  dataSource.connector.dataSource.log = function (msg) {
   console.log(msg);
  };

  if(callback){
    dataSource.connector.connect(callback);
    process.nextTick(callback);
  }
};
