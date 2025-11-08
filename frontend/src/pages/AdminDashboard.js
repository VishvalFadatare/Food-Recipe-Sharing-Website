// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { Container, Typography } from '@mui/material';

// const AdminDashboard = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchAllRecipes = async () => {
//       try {
//         const res = await api.get('/admin/recipes');
//         setRecipes(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchAllRecipes();
//   }, []);

//   return React.createElement(Container, null,
//     React.createElement(Typography, { variant: "h4", sx: { mt: 4, mb: 2 } }, "Admin Dashboard"),
//     // TODO: Map over 'recipes' and render them in a list or table
//     // Add a "Delete" button for each
//     // and call api.delete(`/admin/recipes/${id}`)
//     React.createElement(Typography, null, `Total recipes on platform: ${recipes.length}`)
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  // const [users, setUsers] = useState(0); // Placeholder for user count
  // Change it to this:
const [users] = useState([]);

  useEffect(() => {
    // Fetch all recipes using the admin-only route
    const fetchAllRecipes = async () => {
      try {
        const res = await api.get('/admin/recipes');
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Could not fetch recipes');
      }
    };
    fetchAllRecipes();
    // You would also fetch users here, e.g., api.get('/admin/users')
  }, []);

  // Admin delete handler (FIXED)
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this recipe?')) {
      try {
        // Use the admin-only delete route
        await api.delete(`/admin/recipes/${id}`);
        setRecipes(recipes.filter(recipe => recipe._id !== id));
        toast.success('Recipe deleted by admin');
      } catch (err) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  // --- Render ---
  return React.createElement(Container, { maxWidth: "lg" },
    React.createElement(Typography, { variant: "h4", sx: { mt: 4, mb: 2 } }, "Admin Dashboard"),
    
    // --- Stats Cards (Stub) ---
    React.createElement(Box, { sx: { display: 'flex', gap: 2, mb: 4 } },
      React.createElement(Paper, { sx: { p: 2, flex: 1 } },
        React.createElement(Typography, { variant: "h6" }, "Total Recipes"),
        React.createElement(Typography, { variant: "h4" }, recipes.length)
      ),
      React.createElement(Paper, { sx: { p: 2, flex: 1 } },
        React.createElement(Typography, { variant: "h6" }, "Total Users"),
        React.createElement(Typography, { variant: "h4" }, users) // Placeholder
      )
    ),

    // --- Manage Recipes List ---
    React.createElement(Typography, { variant: "h5", sx: { mb: 2 } }, "Manage Recipes"),
    React.createElement(Paper, null,
      React.createElement(List, null,
        recipes.map((recipe) => 
          React.createElement(ListItem, { 
            key: recipe._id,
            secondaryAction: React.createElement(IconButton, { 
              edge: "end", 
              'aria-label': "delete", 
              onClick: () => handleDelete(recipe._id) 
            },
              React.createElement(DeleteIcon)
            )
          },
            React.createElement(ListItemText, {
              primary: recipe.name,
              secondary: `By: ${recipe.user?.name || 'Unknown'} (Email: ${recipe.user?.email || 'N/A'})`
            })
          )
        )
      )
    )
  );
};

export default AdminDashboard;