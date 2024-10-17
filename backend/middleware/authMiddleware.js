const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Verificar o token no cabeçalho 'x-auth-token'
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded user:', req.user);  // Adiciona este log
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = authMiddleware;
