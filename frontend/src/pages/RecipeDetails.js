import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, Box, CircularProgress, Paper, Chip } from '@mui/material';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the URL
  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Use the existing API route to get a single recipe
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return React.createElement(Container, { sx: { textAlign: 'center', mt: 10 } },
      React.createElement(CircularProgress)
    );
  }

  if (!recipe) {
    return React.createElement(Container, null,
      React.createElement(Typography, { variant: "h5", color: "error", sx: { mt: 10 } }, "Recipe not found.")
    );
  }

  // --- Helper to render list items ---
  const renderList = (title, items) => {
    return React.createElement(Box, { sx: { mb: 3 } },
      React.createElement(Typography, { variant: "h5", gutterBottom: true }, title),
      React.createElement('ul', null,
        items.map((item, index) => 
          React.createElement('li', { key: index },
            React.createElement(Typography, { variant: "body1" }, item)
          )
        )
      )
    );
  };

  // --- Main Render ---
  return React.createElement(Container, { maxWidth: "md" },
    React.createElement(Paper, { sx: { my: 4, p: 4 } },
      // 1. Title
      React.createElement(Typography, { variant: "h2", gutterBottom: true }, recipe.name),

      // 2. Author and Category
      React.createElement(Box, { sx: { mb: 2, display: 'flex', alignItems: 'center' } },
        React.createElement(Typography, { variant: "subtitle1", color: "text.secondary", sx: { mr: 2 } },
          `By: ${recipe.user.name}`
        ),
        React.createElement(Chip, { label: recipe.category, color: "primary", variant: "outlined" })
      ),
      React.createElement(Typography, { variant: "subtitle1", color: "text.secondary", sx: { mb: 2 } },
        `Prep Time: ${recipe.prepTime}`
      ),

      // 3. Photo
      React.createElement(Box, { 
          component: 'img', 
          src: `${backendUrl}${recipe.imageUrl}`, 
          alt: recipe.name,
          sx: { width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', mb: 3 } 
      }),

      // 4. Ingredients
      renderList("Ingredients", recipe.ingredients),
      
      // 5. Steps
      renderList("Steps", recipe.steps)
    )
  );
};

export default RecipeDetails;