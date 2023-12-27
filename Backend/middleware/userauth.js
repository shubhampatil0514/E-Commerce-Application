const jwt = require('jsonwebtoken');
const JWT_SECRET ="8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb";
const userAuth = (req, res, next) => {
const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Authorization header is missing' });
  }
  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token verification failed' });
    }
    next();
  });
};

module.exports = userAuth;
