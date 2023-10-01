const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const secretKey = process.env.APP_SECRET || 'your-secret-key';

module.exports = {
    // Xác thực người chơi và tạo token JWT Sample
    // sample: function (req, res) {
    //     const { username } = req.body;
    //     console.log(req.body.json);
    //     if (!username) {
    //         return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi.' });
    //     }

    //     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    //     console.log(`Cấp Token ${token} cho người dùng trong thời hạn 1H`)
    //     res.json({ token });
    // },

    // Xác thực người chơi và tạo token JWT
    authen: function (req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi và mật khẩu.' });
        }

        // Gọi phương thức findUserByUsername từ lớp User để tìm người dùng theo username
        User.findUserByUsername(username, (err, user) => {
            console.log(`Tìm user...`);
            if (err) {
                console.log(`Lỗi: ${err}`);
                return res.status(500).json({ error: 'Lỗi khi tìm người dùng.' });
            }

            // Kiểm tra xem người dùng có tồn tại và mật khẩu trùng khớp
            if (!user) {
                return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không chính xác.' });

            } else {
                console.log(`User: ${user.username}`);
                console.log(`User: ${user.password}`);
                console.log(`Kiểm tra mật khẩu sử dụng bcrypt `);
                // Kiểm tra mật khẩu sử dụng bcrypt
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: `${err}` });;
                    }
                    if (!result) {
                        console.log(result);
                        console.log('Lỗi xác thực mật khẩu.');
                        return res.status(401).json({ error: 'Mật khẩu không đúng.' });
                    }
                    // Nếu result là true, mật khẩu khớp; ngược lại, mật khẩu không khớp.
                    console.log(`Mật khẩu khớp`);
                    // Tạo token JWT và gửi về cho máy khách
                    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                    res.setHeader('Authorization', `Bearer ${token}` );
                    const tokenName = 'TIEN_LEN_GAME_TOKEN';
                    res.json({ username: user.username, tokenName: tokenName, token: token });
                });
                // bcrypt.compare(password, user.password, (err, result) => {
                //     if (err) {
                //         console.log('Lỗi xác thực mật khẩu.');
                //         return res.status(500).json({ error: 'Lỗi xác thực mật khẩu.' });
                //     }

                //     if (!result) {
                //         console.log(result);
                //         console.log('Lỗi xác thực mật khẩu.');
                //         return res.status(401).json({ error: 'Mật khẩu không đúng.' });
                //     }

                //     // Tạo token JWT và gửi về cho máy khách
                //     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                //     const tokenName = 'TIEN_LEN_GAME_TOKEN';
                //     res.json({ username: user.username, tokenName: tokenName, token: token });
                // });
            }
        });

    },

    logout: function (req, res) {
        jwt.sign({  }, secretKey, { expiresIn: '0h' });
        // Đặt thời gian sống của token thành 0 để hủy nó
        res.setHeader('Authorization', '');
        res.json({ message: 'Logged out successfully' });
    }

}