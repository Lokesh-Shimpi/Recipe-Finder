// Top navigation bar with responsive menu toggling
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">Tasty</span>Explorer
        </Link>
        
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</Link></li>
          <li><Link to="/shopping-list" onClick={() => setMenuOpen(false)}>Shopping List</Link></li>
          <li><Link to="/meal-planner" onClick={() => setMenuOpen(false)}>Meal Planner</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
