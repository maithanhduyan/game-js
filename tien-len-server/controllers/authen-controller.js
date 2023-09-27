const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const secretKey = process.env.APP_SECRET || 'your-secret-key';

module.exports = {
    // để xác thực người chơi và tạo token JWT
    sample: function (req, res) {
        const { username } = req.body;
        console.log(req.body.json);
        if (!username) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi.' });
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        console.log(`Cấp Token ${token} cho người dùng trong thời hạn 1H`)
        res.json({ token });
    },

    authen: function (req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi và mật khẩu.' });
        }

        // Gọi phương thức findUserByUsername từ lớp User để tìm người dùng theo username
        User.findUserByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi tìm người dùng.' });
            }

            // Kiểm tra xem người dùng có tồn tại và mật khẩu trùng khớp
            if (!user) {
                return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không chính xác.' });

            } else {
                // Kiểm tra mật khẩu sử dụng bcrypt
                bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
                    if (bcryptErr) {
                        return res.status(500).json({ error: 'Lỗi xác thực mật khẩu.' });
                    }

                    if (!bcryptRes) {
                        return res.status(401).json({ error: 'Mật khẩu không đúng.' });
                    }

                    // Tạo token JWT và gửi về cho máy khách
                    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                    res.json({ token });
                });
            }
        });

    }

}