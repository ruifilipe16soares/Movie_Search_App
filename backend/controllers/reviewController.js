// backend/controllers/reviewController.js
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const user = req.user._id;  // Extraído do token de autenticação
  const username = req.user.username;

  console.log('Movie ID:', movieId);
  console.log('Rating:', rating);
  console.log('Comment:', comment);
  console.log('User ID:', user);
  console.log('Username:', username);

  try {
    const review = new Review({
      movieId,
      user,
      username,
      rating,
      comment
    });
    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error while adding review:', error);
    res.status(500).json({ message: 'Error adding review', error: error.message  });
  }
};

exports.getReviews = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movieId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

exports.getAverageRating = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movieId });
    const averageRating = reviews.length
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating average rating' });
  }
};
