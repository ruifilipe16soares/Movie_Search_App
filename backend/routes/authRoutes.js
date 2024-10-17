const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController');
const router = express.Router();

// Rota de registo
router.post('/register', register);

// Rota de login
router.post('/login', login);

router.get('/auth/verify', verifyToken);

module.exports = router;
