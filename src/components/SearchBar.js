// File: src/components/SearchBar.js
import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, placeholder }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) onSearch(searchValue);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder || "Search for recipes..."}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

