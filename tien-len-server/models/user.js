const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../data/db')

class User {
    constructor(username, score = 0) {
        this.username = username;
        this.password = password;
        this.score = score;
    }

    static getAllUsers(callback) {
        db.query("SELECT * FROM `user` ", (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static findUserByUsername(username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null); // Không tìm thấy người dùng
            }
            const user = results[0];
            callback(null, user);
        });
    }

    save(callback) {
        db.run("INSERT INTO users (username, score) VALUES (?, ?)", [this.username, this.score], callback);
    }

    // Thêm hàm để tạo mật khẩu băm và lưu vào cơ sở dữ liệu
    hashPasswordAndSave(callback) {
        // Sử dụng bcrypt để tạo mật khẩu băm
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }

            this.password = hashedPassword; // Lưu mật khẩu băm vào thuộc tính password

            // Tiếp theo, thực hiện lưu thông tin người dùng vào cơ sở dữ liệu
            db.run("INSERT INTO users (username, password, score) VALUES (?, ?, ?)", [this.username, this.password, this.score], callback);
        });
    }

    // Thêm hàm để kiểm tra mật khẩu
    checkPassword(password, callback) {
        bcrypt.compare(password, this.password, (err, result) => {
            if (err) {
                return callback(err, false);
            }

            // Nếu result là true, mật khẩu khớp; ngược lại, mật khẩu không khớp.
            callback(null, result);
        });
    }
}

module.exports = User;
