import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: '', ingredients: '', steps: '', prepTime: '', category: ''
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('prepTime', formData.prepTime);
    data.append('category', formData.category);
    data.append('image', file);

    try {
      await api.post('/recipes', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Recipe added!');
      navigate('/my-recipes');
    } catch (err) {
      toast.error('Failed to add recipe');
    }
  };

  return React.createElement(Container, { maxWidth: "sm" },
    React.createElement(Box, { component: "form", onSubmit: onSubmit, sx: { mt: 8 } },
      React.createElement(Typography, { variant: "h4", gutterBottom: true }, "Add a New Recipe"),
      
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Recipe Name", name: "name", onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Ingredients (comma-separated)", name: "ingredients", onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Steps (period-separated)", name: "steps", multiline: true, rows: 4, onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Prep Time (e.g., 30 mins)", name: "prepTime", onChange: onChange, required: true }),
      React.createElement(TextField, { margin: "normal", fullWidth: true, label: "Category (e.g., Dessert)", name: "category", onChange: onChange, required: true }),
      
      React.createElement(Button, { variant: "contained", component: "label", sx: { mt: 2 } },
        "Upload Image",
        React.createElement("input", { type: "file", name: "image", hidden: true, onChange: onFileChange, required: true })
      ),
      file && React.createElement(Typography, { sx: { display: 'inline', ml: 2 } }, file.name),
      
      React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3 } },
        "Submit Recipe"
      )
    )
  );
};

export default AddRecipe;