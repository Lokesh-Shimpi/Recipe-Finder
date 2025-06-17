// Displays a grid of recipe cards or a "no recipes" message
import React from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeGrid.css';

const RecipeGrid = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
