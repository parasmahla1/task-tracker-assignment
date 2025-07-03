import React from 'react';
import Icon from './Icon';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : ''}`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <Icon 
        name={isDarkMode ? 'sun' : 'moon'} 
        size={18} 
        color={isDarkMode ? '#ffc107' : '#667eea'} 
      />
    </button>
  );
};

export default DarkModeToggle;
