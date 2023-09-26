const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Cấu hình CORS để cho phép từ các nguồn cụ thể
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:8000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server);

// Một mảng lưu trữ thông tin của các phòng
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

    // Khi một người chơi gửi tin nhắn
    socket.on('sendMessage', (roomName, message) => {
        io.to(roomName).emit('message', { sender: socket.id, text: message });
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

    // Khi một người chơi ngắt kết nối
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
