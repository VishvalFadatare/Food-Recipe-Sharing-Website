import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.token);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return React.createElement(Container, { maxWidth: "xs" },
    React.createElement(Box, { component: "form", onSubmit: onSubmit, sx: { mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' } },
      
      React.createElement(Typography, { variant: "h4", gutterBottom: true }, "Login"),
      
      React.createElement(TextField, {
        margin: "normal", fullWidth: true, label: "Email", name: "email",
        type: "email", onChange: onChange, required: true
      }),
      
      React.createElement(TextField, {
        margin: "normal", fullWidth: true, label: "Password", name: "password",
        type: "password", onChange: onChange, required: true
      }),
      
      React.createElement(Button, {
        type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }
      }, "Login"),
      
      React.createElement(Link, { component: RouterLink, to: "/register", variant: "body2" },
        "Don't have an account? Register"
      )
    )
  );
};

export default Login;