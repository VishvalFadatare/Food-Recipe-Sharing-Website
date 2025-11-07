import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    name: '', ingredients: '', steps: '', prepTime: '', category: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Get the recipe ID from the URL

  useEffect(() => {
    // 1. Fetch the existing recipe data
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        const { name, ingredients, steps, prepTime, category } = res.data;
        // 2. Populate the form
        setFormData({
          name,
          ingredients: ingredients.join(', '), // Join array back to string
          steps: steps.join('. '),           // Join array back to string
          prepTime,
          category
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load recipe');
        navigate('/my-recipes');
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => setFile(e.target.files[0]);

  // 3. Submit the PUT request
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('prepTime', formData.prepTime);
    data.append('category', formData.category);
    if (file) { // Only append image if a new one was selected
      data.append('image', file);
    }

    try {
      await api.put(`/recipes/${id}`, data, { // Use PUT instead of POST
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Recipe updated!');
      navigate('/my-recipes');
    } catch (err) {
      toast.error('Failed to update recipe');
    }
  };

  if (loading) {
    return React.createElement(Container, null, 
      React.createElement(Typography, { variant: "h6" }, "Loading...")
    );
  }

  // This is the same form as AddRecipe.js
  return React.createElement(Container, { maxWidth: "sm" },
    React.createElement(Box, { component: "form", onSubmit: onSubmit, sx: { mt: 8 } },
      React.createElement(Typography, { variant: "h4", gutterBottom: true }, "Edit Your Recipe"),
      
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Recipe Name", name: "name", value: formData.name, onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Ingredients (comma-separated)", name: "ingredients", value: formData.ingredients, onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Steps (period-separated)", name: "steps", multiline: true, rows: 4, value: formData.steps, onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Prep Time (e.g., 30 mins)", name: "prepTime", value: formData.prepTime, onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Category (e.g., Dessert)", name: "category", value: formData.category, onChange: onChange, required: true }),
      
      React.createElement(Button, { variant: "contained", component: "label", sx: { mt: 2 } },
        "Upload New Image (Optional)",
        React.createElement("input", { type: "file", name: "image", hidden: true, onChange: onFileChange })
      ),
      file && React.createElement(Typography, { sx: { display: 'inline', ml: 2 } }, file.name),
      
      React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3 } },
        "Update Recipe"
      )
    )
  );
};

export default EditRecipe;