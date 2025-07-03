import React from 'react';
import Icon from './Icon';
import './SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Icon name="search" size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="clear-search"
            title="Clear search"
          >
            <Icon name="close" size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
