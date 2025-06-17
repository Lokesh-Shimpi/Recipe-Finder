// File: src/pages/RecipeDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../api/spoonacular';
import { RecipeContext } from '../context/RecipeContext';
import Loader from '../components/Loader';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const { favorites, addToFavorites, removeFromFavorites, addToShoppingList } = useContext(RecipeContext);
  
  const isFavorite = favorites.some(item => item.id === parseInt(id));

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchRecipeDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id));
    } else {
      addToFavorites(recipe);
    }
  };
  
  const handleAddIngredientsToShoppingList = () => {
    recipe.extendedIngredients.forEach(ingredient => {
      addToShoppingList({
        id: ingredient.id || Math.random().toString(36).substr(2, 9),
        name: ingredient.original,
        checked: false
      });
    });
    
    alert('Ingredients added to shopping list!');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div className="error-message">Recipe not found.</div>;
  }

  return (
    <div className="recipe-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <div className="recipe-header">
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <span>Ready in {recipe.readyInMinutes} minutes</span>
            <span>Servings: {recipe.servings}</span>
            {recipe.vegetarian && <span className="diet-badge vegetarian">Vegetarian</span>}
            {recipe.vegan && <span className="diet-badge vegan">Vegan</span>}
            {recipe.glutenFree && <span className="diet-badge gluten-free">Gluten Free</span>}
            {recipe.dairyFree && <span className="diet-badge dairy-free">Dairy Free</span>}
          </div>
        </div>
        
        <div className="recipe-actions">
          <button 
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            onClick={handleAddToFavorites}
          >
            {isFavorite ? '❤️ Saved' : '🤍 Save Recipe'}
          </button>
          <button 
            className="shopping-list-button"
            onClick={handleAddIngredientsToShoppingList}
          >
            🛒 Add to Shopping List
          </button>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} />
          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-value">{recipe.healthScore}</span>
              <span className="stat-label">Health Score</span>
            </div>
            <div className="stat">
              <span className="stat-value">{recipe.pricePerServing.toFixed(2)}</span>
              <span className="stat-label">Price/Serving</span>
            </div>
            <div className="stat">
              <span className="stat-value">{Math.round(recipe.nutrition?.nutrients.find(n => n.name === "Calories")?.amount || 0)}</span>
              <span className="stat-label">Calories</span>
            </div>
          </div>
        </div>
        
        <div className="recipe-details">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button 
              className={`tab ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'ingredients' && (
              <div className="ingredients-list">
                <h3>Ingredients</h3>
                <ul>
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'instructions' && (
              <div className="instructions">
                <h3>Instructions</h3>
                {recipe.analyzedInstructions.length > 0 ? (
                  <ol>
                    {recipe.analyzedInstructions[0].steps.map(step => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>No detailed instructions available for this recipe.</p>
                )}
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div className="nutrition-info">
                <h3>Nutrition Information</h3>
                {recipe.nutrition ? (
                  <div className="nutrition-grid">
                    {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                      <div key={index} className="nutrient-item">
                        <span className="nutrient-name">{nutrient.name}</span>
                        <span className="nutrient-value">{nutrient.amount.toFixed(1)} {nutrient.unit}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No nutrition information available for this recipe.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {recipe.summary && (
        <div className="recipe-summary">
          <h3>About this Recipe</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;