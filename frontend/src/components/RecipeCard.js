import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';

const RecipeCard = ({ recipe }) => {
  const backendUrl = 'http://localhost:5000'; // Base URL for images

  return React.createElement(Link, { 
      component: RouterLink, 
      to: `/recipe/${recipe._id}`, // <-- This is the link
      sx: { textDecoration: 'none' } 
    },
    React.createElement(Card, { sx: { height: '100%', width: '263px'} },
      React.createElement(CardMedia, {
        component: "img",
        height: "140",
        width:'150',
        image: `${backendUrl}${recipe.imageUrl}`,
        alt: recipe.name
      }),
      React.createElement(CardContent, null,
        React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "div" },
          recipe.name
        ),
        // React.createElement(Typography, { variant: "body2", color: "text.secondary" },
        //   `By: ${recipe.user.name}`
        // ),
        React.createElement(Typography, { variant: "body2", color: "text.secondary" },
          `Category: ${recipe.category}`
        )
      )
    )
  );
};

export default RecipeCard;