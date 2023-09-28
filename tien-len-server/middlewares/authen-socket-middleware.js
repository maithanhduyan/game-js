const jwt = require('jsonwebtoken');
const secretKey = process.env.APP_SECRET || 'your-secret-key';

// Middleware để xác thực token cho các yêu cầu Socket.io
function authenticateSocket(socket, next) {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Không tìm thấy token.'));
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return next(new Error('Token không hợp lệ.'));
        }

        // Lưu thông tin người chơi vào đối tượng socket để sử dụng sau này
        socket.username = decoded.username;
        socket.userid = decoded.userid;

        next();
    });
}

module.exports = authenticateSocket;
