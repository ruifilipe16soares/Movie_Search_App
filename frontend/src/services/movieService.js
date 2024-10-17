import axios from 'axios';

const API_KEY = '422a42de'; // Coloca aqui a tua chave da OMDb~

const API_URL = 'http://localhost:5000/api'; // Endereço da API backend

// Função para pesquisar filmes
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Função para obter detalhes de um filme
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Função para adicionar uma avaliação
export const addReview = async (movieId, rating, comment, token) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ movieId, rating, comment })
    });

    if (!response.ok) {
      throw new Error('Erro ao submeter a avaliação');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Função para obter todas as avaliações de um filme
export const getReviews = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Função para obter a média das avaliações de um filme
export const getAverageRating = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${movieId}/average`);
    return response.data.averageRating; // Assume que o backend retorna um objeto com "averageRating"
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
};

// Função para verificar a validade do token JWT
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { 
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Token verification failed', err);
    return { success: false };
  }
};
