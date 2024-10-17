// backend/routes/reviewRoutes.js
const express = require('express');
const { addReview, getReviews, getAverageRating } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/reviews', authMiddleware, addReview);
router.get('/reviews/:movieId', getReviews);
router.get('/reviews/:movieId/average', getAverageRating);

module.exports = router;
