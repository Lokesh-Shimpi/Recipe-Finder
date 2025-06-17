// Global state for favorites, shopping list, and meal plan

import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [mealPlan, setMealPlan] = useState({
    monday: null, tuesday: null, wednesday: null,
    thursday: null, friday: null, saturday: null, sunday: null
  });

  // Load from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedShoppingList = localStorage.getItem('shoppingList');
    const storedMealPlan = localStorage.getItem('mealPlan');

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedShoppingList) setShoppingList(JSON.parse(storedShoppingList));
    if (storedMealPlan) setMealPlan(JSON.parse(storedMealPlan));
  }, []);

  // Persist state to localStorage
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('shoppingList', JSON.stringify(shoppingList)), [shoppingList]);
  useEffect(() => localStorage.setItem('mealPlan', JSON.stringify(mealPlan)), [mealPlan]);

  // Favorites handlers
  const addToFavorites = (recipe) => {
    setFavorites(prev => prev.some(item => item.id === recipe.id) ? prev : [...prev, recipe]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(recipe => recipe.id !== id));
  };

  // Shopping list handlers
  const addToShoppingList = (ingredient) => {
    setShoppingList(prev => prev.some(item => item.name === ingredient.name) ? prev : [...prev, ingredient]);
  };

  const removeFromShoppingList = (id) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  // Meal plan handlers
  const addToMealPlan = (day, recipe) => {
    setMealPlan(prev => ({ ...prev, [day]: recipe }));
  };

  const removeFromMealPlan = (day) => {
    setMealPlan(prev => ({ ...prev, [day]: null }));
  };

  return (
    <RecipeContext.Provider value={{
      favorites, addToFavorites, removeFromFavorites,
      shoppingList, addToShoppingList, removeFromShoppingList,
      mealPlan, addToMealPlan, removeFromMealPlan
    }}>
      {children}
    </RecipeContext.Provider>
  );
};
