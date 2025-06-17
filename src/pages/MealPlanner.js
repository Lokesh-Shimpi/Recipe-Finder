// File: src/pages/MealPlanner.js
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { Link } from 'react-router-dom';
import { getRandomRecipes } from '../api/spoonacular';
import '../styles/MealPlanner.css';

const MealPlanner = () => {
  const { mealPlan, addToMealPlan, removeFromMealPlan } = useContext(RecipeContext);
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleGenerateRandomMeal = async (day) => {
    try {
      const response = await getRandomRecipes();
      if (response?.recipes?.length > 0) {
        addToMealPlan(day, response.recipes[0]);
      }
    } catch (error) {
      console.error('Error generating random meal:', error);
    }
  };

  return (
    <div className="meal-planner-container">
      <h1>Weekly Meal Planner</h1>
      <p className="planner-instructions">
        Plan your meals for the week by adding favorite recipes or generating random ideas.
      </p>

      <div className="meal-plan-grid">
        {days.map(day => (
          <div key={day} className="day-card">
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>

            {mealPlan[day] ? (
              <div className="planned-meal">
                <img src={mealPlan[day].image} alt={mealPlan[day].title} className="meal-image" />
                <h4>{mealPlan[day].title}</h4>
                <div className="meal-actions">
                  <Link to={`/recipe/${mealPlan[day].id}`} className="view-recipe-btn">
                    View Recipe
                  </Link>
                  <button className="remove-meal-btn" onClick={() => removeFromMealPlan(day)}>
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-meal">
                <p>No meal planned</p>
                <button className="generate-meal-btn" onClick={() => handleGenerateRandomMeal(day)}>
                  Generate Random Meal
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="meal-plan-summary">
        <h3>Your Week at a Glance</h3>
        <p>{Object.values(mealPlan).filter(Boolean).length} of 7 days planned</p>
      </div>
    </div>
  );
};

export default MealPlanner;
