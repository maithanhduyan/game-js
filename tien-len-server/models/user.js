const bcrypt = require('bcrypt');
const db = require('../data/db')

class User {
    constructor(username, password, score = 0) {
        this.id = -1;
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
        db.query("SELECT * FROM `user` WHERE username = ?", [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null); // Không tìm thấy người dùng
            }
            const user = results[0];
            // console.log(user)
            callback(null, user);
        });
    }

    static createUser(username, password, callback) {
        const saltRounds = 10; // Số lần lặp để tạo salt (salt round)
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Lỗi khi tạo mật khẩu: ' + err.message);
                return callback(err, null);
            }
            console.log(hash);
            const newUser = new User(username, hash); // Lưu hash mật khẩu vào đối tượng người dùng mới
            // Thực hiện truy vấn để chèn người dùng mới vào cơ sở dữ liệu
            const sql = 'INSERT INTO user (username, password, score) VALUES (?, ?, ?)';
            const values = [newUser.username, newUser.password, newUser.score];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo người dùng: ' + err.message);
                    return callback(err, null);
                }
                console.log('Người dùng đã được tạo: ' + newUser.username);
                newUser.id = result.insertId; // Lưu ID của người dùng đã được tạo
                callback(null, newUser);
            })
        });

        // const sql = `INSERT INTO user (username, password, score) VALUES (?, ?, ?)`;
        // const values = [username, password, 0];
        // db.query(sql, values, (err, results) => {
        //     if (err) {
        //         console.log(err)
        //         return callback(err, null);
        //     }
        //     if (results.length === 0) {
        //         return callback(null, null);
        //     }
        //     console.log(results)
        //     const user = null;
        //     if (results.affectedRows === 1) {
        //         const user = new User(username, password, 0);

        //     }
        //     callback(null, user);
        // });

    }

    save(callback) {
        db.run("INSERT INTO `user` (username, score) VALUES (?, ?)", [this.username, this.score], callback);
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
            db.run("INSERT INTO `user` (username, password, score) VALUES (?, ?, ?)", [this.username, this.password, this.score], callback);
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
