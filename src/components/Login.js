import React, { useState } from 'react';
import Icon from './Icon';
import { saveUser } from '../utils/localStorage';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    const user = {
      username: username.trim(),
      loginTime: new Date().toISOString()
    };

    saveUser(user);
    onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>
            <Icon name="task" size={32} color="#667eea" />
            Task Tracker
          </h1>
          <p>Welcome! Please enter your username to continue.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(''); 
              }}
              placeholder="Enter your username"
              className={error ? 'input-error' : ''}
              autoComplete="username"
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button type="submit" className="login-button">
            Get Started
          </button>
        </form>
        
        <div className="login-footer">
          <p>Your tasks will be saved locally in your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
