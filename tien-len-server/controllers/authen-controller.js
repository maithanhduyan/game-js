const jwt = require('jsonwebtoken');
const secretKey = process.env.APP_SECRET || 'your-secret-key';
module.exports = {
    // để xác thực người chơi và tạo token JWT

    authen: function (req, res) {
        const { username } = req.body;
        console.log(req.body.json);
        if (!username) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi.' });
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        console.log(`Cấp Token ${token} cho người dùng trong thời hạn 1H`)
        res.json({ token });
    }

}