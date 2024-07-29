import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../helpers/auth';
import '../styles/ManagerLoginPage.css'; // Ensure the path is correct


const LoginManager = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/manager/loginmanager', { email, password });
      setToken(response.data.token);
      navigate('/manager/dashboard');
    } catch (error) {
      console.error('Failed to login:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div className="manager-login-container">
      <div className="manager-login-card">
        <h2>Manager Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginManager;
