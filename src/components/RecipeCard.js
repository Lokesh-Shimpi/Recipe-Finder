// Represents a single recipe card with favorite functionality
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(RecipeContext);
  const isFavorite = favorites.some(item => item.id === recipe.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    isFavorite ? removeFromFavorites(recipe.id) : addToFavorites(recipe);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="card-image-container">
        <img src={recipe.image} alt={recipe.title} />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <div className="recipe-tags">
          {recipe.vegetarian && <span className="recipe-tag vegetarian">Vegetarian</span>}
          {recipe.vegan && <span className="recipe-tag vegan">Vegan</span>}
          {recipe.glutenFree && <span className="recipe-tag gluten-free">Gluten Free</span>}
          {recipe.dairyFree && <span className="recipe-tag dairy-free">Dairy Free</span>}
        </div>
        <div className="recipe-meta">
          <span>Ready in {recipe.readyInMinutes || '??'} mins</span>
          <span>{recipe.servings || '?'} servings</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
