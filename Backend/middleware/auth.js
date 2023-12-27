const jwt = require('jsonwebtoken');
const JWT_SECRET ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4NjgxMzMsImRhdGWf";
const adminAuth = (req, res, next) => {
const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Authorization header is missing - trst asds fdhgh' });
  }
  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token verification failed' });
    }
    
    req.user = {
      role: decoded.role,
    }
    
    next();
  });
};

module.exports = adminAuth;
