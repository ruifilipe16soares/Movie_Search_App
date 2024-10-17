import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, addReview, getReviews, getAverageRating } from '../services/movieService';

const MovieDetails = () => {
  const { id: movieId } = useParams();  // Obtém o ID do filme da URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [rating, setRating] = useState(0); // Para avaliação do utilizador
  const [comment, setComment] = useState(''); // Para comentário do utilizador
  const [reviews, setReviews] = useState([]); // Para armazenar os comentários
  const [averageRating, setAverageRating] = useState(0); // Média das avaliações

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchReviewsAndRating = async () => {
      try {
        const movieReviews = await getReviews(movieId);
        const avgRating = await getAverageRating(movieId);
        setReviews(movieReviews);
        setAverageRating(avgRating.averageRating);
      } catch (error) {
        console.error('Error fetching reviews or rating:', error);
      }
    };

    fetchMovieDetails();
    fetchReviewsAndRating();
  }, [movieId]);

  const handleSubmitReview = async () => {
    const token = localStorage.getItem('token'); // Token de autenticação do utilizador
    if (!token) {
      alert('You need to be logged in to submit a review!');
      return;
    }

    if (!rating || !comment) {
      alert('Please provide a rating and a comment!');
      return;
    }

    try {
      await addReview(movieId, rating, comment, token);
      setRating(0);
      setComment('');
      alert('Review submitted successfully!');
      const updatedReviews = await getReviews(movieId); // Atualiza as reviews após submeter
      const updatedAvgRating = await getAverageRating(movieId); // Atualiza a média
      setReviews(updatedReviews);
      setAverageRating(updatedAvgRating.averageRating);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !movie) {
    return <p>Movie not found or an error occurred</p>;
  }

  return (
    <div>
      {/* Detalhes do Filme */}
      <h2>{movie.Title}</h2>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />

      {/* Avaliação do Filme */}
      <div>
        <h3>Have you ever seen this movie? Rate from 1 to 5</h3>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            style={{ cursor: 'pointer', fontSize: '24px', color: num <= rating ? 'gold' : 'gray' }}
          >
            {num <= rating ? '★' : '☆'}
          </span>
        ))}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength="250"
          placeholder="Leave a comment (max 250 characters)"
          style={{ display: 'block', width: '100%', marginTop: '10px' }}
        />
        <button onClick={handleSubmitReview}>Submit Review</button>
      </div>

      {/* Média das avaliações */}
      <div>
        <h4>Average Rating: {averageRating} / 5</h4>
        <div>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              style={{ fontSize: '24px', color: num <= Math.round(averageRating) ? 'gold' : 'gray' }}
            >
              {num <= averageRating ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      {/* Comentários dos Utilizadores */}
      <div>
        <h4>User Reviews</h4>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <p>
                <strong>{review.username}</strong> ({new Date(review.date).toLocaleDateString()}):{' '}
                {review.comment}
              </p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
