/**
 * 
 * Create user and store in mysql server
 * 
 */
const mysql = require('mysql2');

// Thay thế thông tin kết nối cơ sở dữ liệu của bạn
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tien-len-db',
};

// Tạo một kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection(dbConfig);

// Tạo người dùng mẫu
const user = {
    username: 'test',
    password: 'test123%$#',
};
const table = `usertest`;
// Hàm để thêm người dùng vào cơ sở dữ liệu
function createUser() {
    connection.query(
        `INSERT INTO ${table} (username, password) VALUES (?, ?)`,
        [user.username, user.password],
        (err, results) => {
            if (err) {
                console.error('Lỗi khi thêm người dùng:', err);
            } else {
                console.log('Người dùng đã được thêm thành công!');
            }

            // Đóng kết nối sau khi thực hiện xong
            connection.end();
        }
    );
}

// Khi kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
        return;
    }

    console.log('Đã kết nối đến cơ sở dữ liệu.');
    // connect to the MySQL server
    connection.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        let createSQL = `CREATE TABLE IF NOT EXISTS ${table} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          )`;

        connection.query(createSQL, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
        // Thêm người dùng vào cơ sở dữ liệu
        createUser();
        connection.end(function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
    });


});
