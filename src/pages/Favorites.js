// File: src/pages/Favorites.js
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(RecipeContext);

  return (
    <div className="favorites-container">
      <h1>Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any recipes yet.</p>
          <p>Browse recipes and click the heart icon to add them to your favorites!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <div key={recipe.id} className="favorite-item">
              <RecipeCard recipe={recipe} />
              <button 
                className="remove-favorite" 
                onClick={() => removeFromFavorites(recipe.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
