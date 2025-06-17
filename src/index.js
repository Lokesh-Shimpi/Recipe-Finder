// Application bootstrap with context provider

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { RecipeProvider } from './context/RecipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </React.StrictMode>
);
