const app = require('express')();
const cors = require('cors');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path')

// Cấu hình CORS để cho phép từ các nguồn cụ thể
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:8000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io 
const rooms = {};
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Gửi danh sách phòng cho client
    socket.emit('roomList', Object.keys(rooms));

    // Khi một người chơi tham gia vào phòng
    socket.on('joinRoom', (roomName, playerName) => {
        socket.join(roomName);

        // Lưu thông tin người chơi trong phòng
        if (!rooms[roomName]) {
            rooms[roomName] = [];
        }
        rooms[roomName].push({ id: socket.id, name: playerName });

        // Gửi thông báo cho tất cả người chơi trong phòng
        io.to(roomName).emit('playerJoined', rooms[roomName]);

        // Gửi danh sách phòng cho tất cả người chơi
        io.emit('roomList', Object.keys(rooms));
    });

    // Khi một người chơi rời phòng
    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);

        // Xóa người chơi ra khỏi danh sách
        rooms[roomName] = rooms[roomName].filter(player => player.id !== socket.id);

        // Gửi thông báo cho tất cả người chơi trong phòng
        io.to(roomName).emit('playerLeft', rooms[roomName]);

        // Nếu không còn người chơi trong phòng, xóa phòng
        if (rooms[roomName].length === 0) {
            delete rooms[roomName];
            io.emit('roomList', Object.keys(rooms));
        }
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    // Khi một người chơi ngắt kết nối
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

http.listen(port, host, () => {
    console.log(`Socket.IO server running at http://${host}:${port}/`);
});