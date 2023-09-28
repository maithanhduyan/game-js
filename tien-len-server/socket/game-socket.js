// game-socket.js
// Đối tượng lưu trữ thông tin về các phòng chơi

const Deck = require('../game/main-game')
const rooms = {};
maxNumPlayers = 4;
function initializeGameSocket(io) {
    io.on('connection', (socket) => {
        socket.on('authentication', (token) => {
            // Kiểm tra token ở đây và xác thực client
            // Nếu token hợp lệ, cho phép client tham gia vào phòng chơi hoặc thực hiện các hoạt động khác
            // Nếu không hợp lệ, có thể ngắt kết nối hoặc thực hiện xử lý khác
            if (token) {
                console.log(`Kết nối hợp lệ. ${token}`)
            } else {
                console.log(`Kết nối không hợp lệ. ${token}`)
            }

            // Giả sử bạn đã kiểm tra token và xác thực thành công
            const authenticated = true; // Đã xác thực thành công

            // // Gửi phản hồi xác thực về máy khách
            // socket.emit('authenticationResponse', authenticated);

            // if (authenticated) {
            //     // Nếu xác thực thành công, bạn có thể thực hiện các hoạt động sau đây
            //     // Ví dụ: Cho phép tham gia vào phòng chơi, gửi danh sách phòng, v.v.
            // } else {
            //     // Nếu xác thực thất bại, bạn có thể ngắt kết nối hoặc thực hiện xử lý khác
            //     // Ví dụ: Ngắt kết nối socket
            //     socket.disconnect();
            // }
        });
        console.log(`Client connected on socketid: ${socket.id} . ${socket.roomName} with username: ${socket.usename}`);

        // Gửi danh sách phòng cho client
        socket.emit('roomList', Object.keys(rooms));

        // Khi một người chơi tham gia vào phòng
        socket.on('joinRoom', (roomName, playerName) => {
            socket.join('Socket id: ' + socket.id + '/ Room: ' + roomName);
            socket.join(playerName);
            console.log('Room name: ' + roomName);
            // Lưu thông tin người chơi trong phòng
            if (!rooms[roomName]) {
                rooms[roomName] = [];
            }
            if (rooms[roomName].length > maxNumPlayers) {
                socket.on('chat message', (msg) => {
                    msg = 'Phòng đã đủ 4 người chơi.';
                    console.log('' + msg);
                    io.emit('chat message', msg);
                });
            } else {
                rooms[roomName].push({ id: socket.id, name: playerName });
            }

            // Gửi thông báo cho tất cả người chơi trong phòng
            io.to(roomName).emit('playerJoined', rooms[roomName]);

            // Gửi danh sách phòng cho tất cả người chơi
            io.emit('roomList', Object.keys(rooms));
        });

        // Chia bài cho người chơi
        socket.on('deck-deal-card', (roonName, playerName, playerHands) => {
            if (true) {
                console.log(`Room: ${roonName} . player(${playerName})`);
                const MainGame = require('../game/main-game');

                const game = new MainGame();
                game.initializeGame(4); // Khởi tạo trò chơi với 4 người chơi
                const hand = game.printPlayerHands(); // In tay của từng người chơi
                console.log(`${socket.usename}`)
                io.emit('deck-deal-card', hand.toString());
            }
        });

        // Khi một người chơi rời phòng
        socket.on('leaveRoom', (roomName) => {
            socket.leave(roomName);

            // Xóa người chơi ra khỏi danh sách
            rooms[roomName] = rooms[roomName].filter((player) => player.id !== socket.id);
            console.log('Người chơi rời khỏi phòng');
            // Gửi thông báo cho tất cả người chơi trong phòng
            io.to(roomName).emit('playerLeft', rooms[roomName]);

            // Nếu không còn người chơi trong phòng, xóa phòng
            if (rooms[roomName].length === 0) {
                delete rooms[roomName];
                io.emit('roomList', Object.keys(rooms));
            }
        });

        socket.on('chat message', (msg) => {
            console.log('' + msg);
            io.emit('chat message', msg);
        });

        // Khi một người chơi ngắt kết nối
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

module.exports = initializeGameSocket;
