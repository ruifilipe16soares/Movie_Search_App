import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';
import { searchMovies } from './services/movieService';
import MovieDetails from './components/MovieDetails';
import { verifyToken } from './services/authService';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar token ao carregar a aplicação
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response.success) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (err) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  // Função para gerir o login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Função para gerir o logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Função para gerir a pesquisa de filmes
  const handleSearch = async (query) => {
    setLoading(true);
    const result = await searchMovies(query);
    setMovies(result);
    setLoading(false);
  };

  // Rota protegida
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/favorites">Favoritos</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registo</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>Movie Search App</h1>
              <SearchBar onSearch={handleSearch} />
              {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
            </div>
          } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
