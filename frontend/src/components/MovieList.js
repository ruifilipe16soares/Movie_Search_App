import { Link } from 'react-router-dom';
import authService from '../services/authService'; // Para adicionar aos favoritos

const MovieList = ({ movies }) => {

  const handleAddFavorite = async (movieId) => {
    try {
      await authService.addFavorite(movieId);
      alert('Filme adicionado aos favoritos!');
    } catch (error) {
      alert('Erro ao adicionar o filme aos favoritos');
    }
  };

  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={movie.Title} />
              {/* Link para os detalhes */}
              <Link to={`/movie/${movie.imdbID}`}>Ver Detalhes</Link>
              {/* Botão para adicionar aos favoritos */}
              <button onClick={() => handleAddFavorite(movie.imdbID)}>Adicionar aos Favoritos</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
