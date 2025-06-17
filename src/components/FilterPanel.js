// File: src/components/FilterPanel.js
import React, { useState, useEffect } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    intolerances: '',
    maxReadyTime: '',
  });

  const diets = [ 'None', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30' ];
  
  const cuisines = [ 'None', 'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 
    'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 
    'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese' ];
  
  const intolerances = [ 'None', 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 
    'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat' ];

    useEffect(() => {
      const nonEmptyFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value && value !== 'None')
      );
    
      // Only call onFilterChange if filters have changed
      onFilterChange(nonEmptyFilters);
    }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === 'None' ? '' : value
    }));
  };

  const resetFilters = () => {
    setFilters({
      diet: '',
      cuisine: '',
      intolerances: '',
      maxReadyTime: '',
    });
  };

  return (
    <div className={`filter-panel ${isExpanded ? 'expanded' : ''}`}>
      <div className="filter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Filter Recipes</h3>
        <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <div className="filter-content">
          {/* Filter inputs */}
          <div className="filter-group">
            <label htmlFor="diet">Diet:</label>
            <select id="diet" name="diet" value={filters.diet || 'None'} onChange={handleFilterChange}>
              {diets.map(diet => <option key={diet} value={diet}>{diet}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="cuisine">Cuisine:</label>
            <select id="cuisine" name="cuisine" value={filters.cuisine || 'None'} onChange={handleFilterChange}>
              {cuisines.map(cuisine => <option key={cuisine} value={cuisine}>{cuisine}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="intolerances">Intolerances:</label>
            <select id="intolerances" name="intolerances" value={filters.intolerances || 'None'} onChange={handleFilterChange}>
              {intolerances.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="maxReadyTime">Max Ready Time (minutes):</label>
            <input
              type="number"
              id="maxReadyTime"
              name="maxReadyTime"
              value={filters.maxReadyTime}
              onChange={handleFilterChange}
              min="0"
              max="300"
              placeholder="Any time"
            />
          </div>

          <button className="reset-filters-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
