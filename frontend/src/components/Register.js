import React, { useState } from 'react';
import authService from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(username, password);
      setMessage(response.message);
    } catch (error) {
      setMessage('Erro ao registar utilizador');
    }
  };

  return (
    <div>
      <h2>Registar</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Registar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
