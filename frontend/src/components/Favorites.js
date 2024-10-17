import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { Link } from 'react-router-dom';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteMovies = await authService.getFavorites();
        setFavorites(favoriteMovies);
      } catch (error) {
        setMessage('Erro ao buscar filmes favoritos');
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Filmes Favoritos</h2>
      {message && <p>{message}</p>}
      {favorites.length === 0 ? (
        <p>Não tens filmes favoritos</p>
      ) : (
        <ul>
          {favorites.map((movieId) => (
            <li key={movieId}>
              {/* Link para a página de detalhes do filme */}
              <Link to={`/movie/${movieId}`}>Ver Detalhes do Filme</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMovies;
