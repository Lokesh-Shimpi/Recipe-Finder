// Home page: search, filters, recipe grid

import React, { useState, useEffect } from 'react';
import { searchRecipes, getRandomRecipes, searchByIngredients } from '../api/spoonacular';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import RecipeGrid from '../components/RecipeGrid';
import Loader from '../components/Loader';

import '../styles/Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('query');
  const [filters, setFilters] = useState({
    diet: '', cuisine: '', intolerances: '', maxReadyTime: ''
  });

  useEffect(() => {
    const fetchRandom = async () => {
      setLoading(true);
      try {
        const data = await getRandomRecipes();
        setRecipes(data.recipes);
      } catch {
        setError('Failed to fetch trending recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchRandom();
  }, []);

  const handleSearch = async (input) => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (searchType === 'query') {
        data = await searchRecipes(input, filters);
        setRecipes(data.results);
      } else {
        const ingredients = input.split(',').map(i => i.trim());
        data = await searchByIngredients(ingredients);
        setRecipes(data);
      }

      if ((data.results && data.results.length === 0) || (Array.isArray(data) && data.length === 0)) {
        setError('No recipes found.');
      }

    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSearchTypeChange = (type) => setSearchType(type);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Find Delicious Recipes</h1>
        <p>Search thousands of recipes from around the world</p>
        <div className="search-container">
          <div className="search-type-toggle">
            <button
              className={`search-type-btn ${searchType === 'query' ? 'active' : ''}`}
              onClick={() => handleSearchTypeChange('query')}
            >
              Search by Name
            </button>
            <button
              className={`search-type-btn ${searchType === 'ingredients' ? 'active' : ''}`}
              onClick={() => handleSearchTypeChange('ingredients')}
            >
              Search by Ingredients
            </button>
          </div>
          <SearchBar
            onSearch={handleSearch}
            placeholder={searchType === 'query'
              ? "Enter recipe name (e.g., 'chicken curry')"
              : "Enter ingredients separated by commas (e.g., 'chicken, garlic, onion')"}
          />
        </div>
      </div>

      <div className="content-area">
        <FilterPanel onFilterChange={handleFilterChange} />
        {loading ? <Loader /> : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <h2>{recipes.length > 0 ? 'Recipes' : 'Trending Recipes'}</h2>
            <RecipeGrid recipes={recipes} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
