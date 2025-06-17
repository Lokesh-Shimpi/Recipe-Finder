// Axios instance and Spoonacular API helpers

import axios from 'axios';

const API_KEY = '3402090b16ca48b5aac0b8657c4b425c';
const BASE_URL = 'https://api.spoonacular.com';

const spoonacular = axios.create({
  baseURL: BASE_URL,
  params: { apiKey: API_KEY }
});

export const searchRecipes = async (query, filters = {}) => {
  try {
    const response = await spoonacular.get('/recipes/complexSearch', {
      params: {
        query,
        number: 12,
        addRecipeInformation: true,
        fillIngredients: true,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await spoonacular.get(`/recipes/${id}/information`, {
      params: { includeNutrition: true }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const searchByIngredients = async (ingredients) => {
  try {
    const response = await spoonacular.get('/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 12,
        ranking: 2,
        ignorePantry: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching by ingredients:', error);
    throw error;
  }
};

export const getRandomRecipes = async (tags = '') => {
  try {
    const response = await spoonacular.get('/recipes/random', {
      params: { number: 6, tags }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
};
