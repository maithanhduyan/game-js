/**
 * Test command:
 * npx nodemon ./test/signup_login_server_test.js
 * */ 

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tien-len-db'
});

db.connect(err => {
    if (err) {
        console.error('Không thể kết nối đến cơ sở dữ liệu: ' + err.message);
        process.exit(1);
    }
    console.log('Đã kết nối đến cơ sở dữ liệu');
});

const secretKey = 'your-secret-key';

// Đăng ký (signup) người dùng
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tên người dùng và mật khẩu.' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Lỗi khi mã hóa mật khẩu: ' + err.message);
            return res.status(500).json({ error: 'Lỗi khi đăng ký.' });
        }

        // Lưu người dùng vào cơ sở dữ liệu
        const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
        const values = [username, hash];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Lỗi khi thêm người dùng vào cơ sở dữ liệu: ' + err.message);
                return res.status(500).json({ error: 'Lỗi khi đăng ký.' });
            }
            console.log('Đăng ký thành công.');
            console.log(hash);
            res.json({ message: 'Đăng ký thành công.' });
        });
    });
});

// Đăng nhập (login) người dùng
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tên người dùng và mật khẩu.' });
    }

    // Lấy mật khẩu từ cơ sở dữ liệu dựa trên tên người dùng
    const sql = 'SELECT * FROM user WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Lỗi khi truy vấn cơ sở dữ liệu: ' + err.message);
            return res.status(500).json({ error: 'Lỗi khi đăng nhập.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Tên người dùng không tồn tại.' });
        }

        const user = results[0];

        // So sánh mật khẩu đã mã hóa từ cơ sở dữ liệu với mật khẩu nhập vào
        bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
            if (bcryptErr) {
                console.error('Lỗi khi so sánh mật khẩu: ' + bcryptErr.message);
                return res.status(500).json({ error: 'Lỗi khi đăng nhập.' });
            }

            if (!bcryptRes) {
                console.log('Mật khẩu không đúng.');
                return res.status(401).json({ error: 'Mật khẩu không đúng.' });
            }

            // Tạo token JWT và gửi về cho máy khách
            const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
            res.json({ username: user.username, token: token });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});
