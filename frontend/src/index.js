// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import App from './App';
// import './index.css'; // You can add global styles here

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   React.createElement(React.StrictMode, null,
//     React.createElement(AuthProvider, null,
//       React.createElement(Router, null,
//         React.createElement(App, null)
//       )
//     )
//   )
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

// --- NEW IMPORTS ---
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your new theme
import { CssBaseline } from '@mui/material'; // Adds baseline styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(ThemeProvider, { theme: theme }, // <-- WRAPPER 1
      React.createElement(CssBaseline, null), // <-- ADD THIS
      React.createElement(AuthProvider, null,
        React.createElement(Router, null,
          React.createElement(App, null)
        )
      )
    )
  )
);