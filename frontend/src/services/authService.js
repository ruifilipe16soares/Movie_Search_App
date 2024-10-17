import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Endereço da API backend

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password })
    .then(response => response.data);
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password })
    .then(response => response.data);
};

const getFavorites = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/favorites`, {
    headers: {
      'x-auth-token': token,
    },
  }).then(response => response.data);
};

const addFavorite = (movieId) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/favorites`, { movieId }, {
    headers: {
      'x-auth-token': token,
    },
  }).then(response => response.data);
};

export default {
  register,
  login,
  getFavorites,
  addFavorite,
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { 
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false };
  }
};