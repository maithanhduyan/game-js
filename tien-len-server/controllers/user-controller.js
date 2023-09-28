const User = require('../models/user')

module.exports = {
    getAll: function (req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ users });
        });
    },
    createUser: function (req, res) {
        const { username, password } = req.body;
        User.createUser(username, password, (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            // Trả dữ liệu cho client
            res.json({ user });
        });
    }
}