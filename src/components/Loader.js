// Spinner/loader shown while recipes are loading
import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading recipes...</p>
    </div>
  );
};

export default Loader;
