import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import Icon from './Icon';
import { clearUser } from '../utils/localStorage';
import './Header.css';

const Header = ({ user, onLogout, isDarkMode, onToggleDarkMode }) => {
  const handleLogout = () => {
    clearUser();
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">
            <Icon name="task" size={28} color="#667eea" />
            Task Tracker
          </h1>
          <span className="welcome-text">Welcome back, {user.username}!</span>
        </div>
        
        <div className="header-right">
          <DarkModeToggle 
            isDarkMode={isDarkMode}
            onToggle={onToggleDarkMode}
          />
          <button onClick={handleLogout} className="logout-button">
            <Icon name="logout" size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
