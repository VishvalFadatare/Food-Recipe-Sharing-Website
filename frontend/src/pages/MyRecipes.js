// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { Container, Typography } from '@mui/material';
// // Import RecipeCard here

// const MyRecipes = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchMyRecipes = async () => {
//       try {
//         const res = await api.get('/recipes/my-recipes');
//         setRecipes(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchMyRecipes();
//   }, []);

//   return React.createElement(Container, null,
//     React.createElement(Typography, { variant: "h4", sx: { mt: 4, mb: 2 } }, "My Recipes"),
//     // TODO: Map over 'recipes' and render 'RecipeCard' components
//     // You will also need to add a "Delete" button to each card
//     // and call api.delete(`/recipes/${id}`)
//     React.createElement(Typography, null, `You have ${recipes.length} recipes.`)
//   );
// };

// export default MyRecipes;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard'; // We will reuse this
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // 1. Fetch user's personal recipes
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get('/recipes/my-recipes');
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Could not fetch your recipes');
      }
    };
    fetchMyRecipes();
  }, []);

  // 2. Delete Handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        // Update UI by removing the deleted recipe from state
        setRecipes(recipes.filter(recipe => recipe._id !== id));
        toast.success('Recipe deleted successfully');
      } catch (err) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  // 3. Edit Handler
  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`); // Navigate to the new Edit page
  };

  // 4. Render the list of recipes
  return React.createElement(Container, { sx: { py: 4 } },
    React.createElement(Typography, { variant: "h4", sx: { mt: 4, mb: 2 } }, 
      "My Recipes"
    ),
    React.createElement(Grid, { container: true, spacing: 4 },
      recipes.length > 0
        ? recipes.map((recipe) => 
            // Create a wrapper for the card and buttons
            React.createElement(Grid, { item: true, key: recipe._id, xs: 12, sm: 6, md: 4 },
              React.createElement(RecipeCard, { recipe: recipe }),
              // Add the Edit and Delete buttons
              React.createElement(Box, { sx: { mt: 1, display: 'flex', justifyContent: 'space-between' } },
                React.createElement(Button, { 
                  variant: "outlined", 
                  size: "small", 
                  onClick: () => handleEdit(recipe._id) 
                }, "Edit"),
                React.createElement(Button, { 
                  variant: "outlined", 
                  size: "small", 
                  color: "error", 
                  onClick: () => handleDelete(recipe._id) 
                }, "Delete")
              )
            )
          )
        : React.createElement(Typography, { sx: { ml: 3 } }, "You haven't added any recipes yet.")
    )
  );
};

export default MyRecipes;