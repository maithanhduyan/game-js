const express = require('express')
const userController = require('../controllers/user-controller')
const authenController = require('../controllers/authen-controller')
const authenticateToken = require('../middlewares/authen-api-middleware')
apiRouter = express.Router()

apiRouter.get("/healthCheck", (req, res) => {
    res.send('Health Check: OK')
})

apiRouter.get('/users', userController.getAll);

apiRouter.post('/users', (req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: 'Username is required' });
        return;
    }

    User.findUserByUsername(username, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (user) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        const newUser = new User(username);
        newUser.save((err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

apiRouter.post('/create-room', (req, res) => {
    rooms[roomId] = { players: [], gameData: {} };
    res.json({ roomId });
});

// API endpoint để tham gia phòng chơi
apiRouter.post('/join-room/:roomId', (req, res) => {
    const { roomId } = req.params;
    const { playerName } = req.body;

    if (!rooms[roomId]) {
        return res.status(404).json({ error: 'Phòng chơi không tồn tại.' });
    }

    if (rooms[roomId].players.length >= 4) {
        return res.status(400).json({ error: 'Phòng chơi đã đủ 4 người chơi.' });
    }

    rooms[roomId].players.push(playerName);
    res.json({ success: true });
});

// Xác thực người chơi và tạo token JWT
apiRouter.post('/login', authenController.authen);
apiRouter.post('/logout', authenticateToken, authenController.logout);
apiRouter.post('/signup', userController.createUser);
module.exports = apiRouter 