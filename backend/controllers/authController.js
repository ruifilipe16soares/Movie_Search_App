const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função de registo
exports.register = async (req, res) => {
  let user = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
  });
  await user.save();
  res.send({ message: 'User registered' });
};

// Função de login
exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send('Invalid username or password');
  }

  const token = user.generateAuthToken();
  res.send({ token });
};

// Função para verificar o token
exports.verifyToken = (req, res) => {
  const token = req.headers['x-auth-token']; // Extrair o token do cabeçalho 'x-auth-token'
  if (!token) return res.status(403).json({ success: false, message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Token inválido' });
    res.status(200).json({ success: true, userId: decoded.id });
  });
};
