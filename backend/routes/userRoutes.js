const express = require('express');
const { getFavorites, addFavorite } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para obter favoritos
router.get('/favorites', authMiddleware, getFavorites);

// Rota para adicionar favoritos
router.post('/favorites', authMiddleware, addFavorite);

module.exports = router;
