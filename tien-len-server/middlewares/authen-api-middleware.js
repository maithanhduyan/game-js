const jwt = require('jsonwebtoken');
const secretKey = process.env.APP_SECRET || 'your-secret-key';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    console.log(`Authenticate Token: ${token}`);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
