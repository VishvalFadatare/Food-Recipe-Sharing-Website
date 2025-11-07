// import React, { useContext } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const onLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Helper to create link buttons
//   const NavLink = (to, text) => React.createElement(Button, 
//     { color: "inherit", component: RouterLink, to: to }, 
//     text
//   );

//   const authLinks = [
//     NavLink('/my-recipes', 'My Recipes'),
//     NavLink('/add-recipe', 'Add Recipe'),
//     auth.user?.role === 'admin' && NavLink('/admin', 'Admin'),
//     React.createElement(Button, { color: "inherit", onClick: onLogout }, "Logout")
//   ];

//   const guestLinks = [
//     NavLink('/login', 'Login'),
//     NavLink('/register', 'Register')
//   ];

//   return React.createElement(AppBar, { position: "static" },
//     React.createElement(Toolbar, null,
//       React.createElement(Typography, 
//         { variant: "h6", component: RouterLink, to: "/", sx: { flexGrow: 1, color: 'white', textDecoration: 'none' } },
//         "Recipe Share"
//       ),
//       React.createElement(Box, null, auth.token ? authLinks : guestLinks)
//     )
//   );
// };

// export default Navbar;

import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to create link buttons
  const NavLink = (to, text) => React.createElement(Button, 
    { color: "inherit", component: RouterLink, to: to }, 
    text
  );

  // --- UPDATED LOGIC ---
  const userLinks = [
    NavLink('/my-recipes', 'My Recipes'),
    NavLink('/add-recipe', 'Add Recipe')
  ];
  
  const adminLinks = [
    NavLink('/admin', 'Manage Recipes')
  ];

  const guestLinks = [
    NavLink('/login', 'Login'),
    NavLink('/register', 'Register')
  ];

  // Dynamically build the links based on role
  const getLinks = () => {
    if (auth.token) {
      let links = [];
      if (auth.user.role === 'user') {
        links = links.concat(userLinks);
      } else if (auth.user.role === 'admin') {
        links = links.concat(adminLinks);
      }
      // Add logout button for all logged-in users
      links.push(React.createElement(Button, { key: "logout", color: "inherit", onClick: onLogout }, "Logout"));
      return links;
    } else {
      return guestLinks;
    }
  };
  
  return React.createElement(AppBar, { position: "static" },
    React.createElement(Toolbar, null,
      React.createElement(Typography, 
        { variant: "h6", component: RouterLink, to: "/", sx: { flexGrow: 1, color: 'white', textDecoration: 'none' } },
        "SharePlate"
      ),
      React.createElement(Box, null, getLinks()) // Use the new function here
    )
  );
};

export default Navbar;