const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('game.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, score INTEGER)");
});

class User {
    constructor(username, score = 0) {
        this.username = username;
        this.score = score;
    }

    static getAllUsers(callback) {
        db.all("SELECT * FROM users", callback);
    }

    static findUserByUsername(username, callback) {
        db.get("SELECT * FROM users WHERE username = ?", [username], callback);
    }

    save(callback) {
        db.run("INSERT INTO users (username, score) VALUES (?, ?)", [this.username, this.score], callback);
    }
}

module.exports = User;
