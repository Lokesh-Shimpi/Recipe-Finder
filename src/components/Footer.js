// Footer section with branding, features, and credits
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TastyExplorer</h3>
          <p>Find and save your favorite recipes</p> <p>from around the world.</p>
        </div>
        <div className="footer-section">
          <h3>Features</h3>
          <ul>
            <li>Recipe Search</li>
            <li>Ingredient-Based Search</li>
            <li>Dietary Filters</li>
            <li>Shopping List</li>
            <li>Meal Planner</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TastyExplorer. All rights reserved by Lokesh Shimpi.</p>
      </div>
    </footer>
  );
};

export default Footer;
