var fs = require('fs');
var dbFile = './data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

db.serialize(function () {
  if (!exists) {
    db.run('CREATE TABLE Matches (context TEXT, data TEXT)');
    console.log("Table: Matches was created. ");
  }
});

module.exports = function (app) {
  app.db = db;
};