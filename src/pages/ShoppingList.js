// File: src/pages/ShoppingList.js
import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/ShoppingList.css';

const ShoppingList = () => {
  const { shoppingList, removeFromShoppingList, addToShoppingList } = useContext(RecipeContext);
  const [checkedItems, setCheckedItems] = useState({});
  const [newItem, setNewItem] = useState('');

  const handleCheckItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addToShoppingList({
        id: Math.random().toString(36).substr(2, 9),
        name: newItem,
        checked: false
      });
      setNewItem('');
    }
  };

  return (
    <div className="shopping-list-container">
      <h1>Your Shopping List</h1>

      {/* Add item input */}
      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Add new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* List items */}
      {shoppingList.length === 0 ? (
        <div className="empty-state">
          <p>Your shopping list is empty.</p>
          <p>Add ingredients from recipes or manually add items above.</p>
        </div>
      ) : (
        <div className="shopping-list">
          <ul>
            {shoppingList.map(item => (
              <li key={item.id} className={checkedItems[item.id] ? 'checked' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => handleCheckItem(item.id)}
                  />
                  <span>{item.name}</span>
                </label>
                <button 
                  className="remove-item" 
                  onClick={() => removeFromShoppingList(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {/* List actions */}
          <div className="shopping-list-actions">
            <button
              className="clear-checked-btn"
              onClick={() => {
                Object.entries(checkedItems).forEach(([id, checked]) => {
                  if (checked) removeFromShoppingList(id);
                });
                setCheckedItems({});
              }}
            >
              Clear Checked Items
            </button>
            <button
              className="clear-all-btn"
              onClick={() => {
                shoppingList.forEach(item => removeFromShoppingList(item.id));
                setCheckedItems({});
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
