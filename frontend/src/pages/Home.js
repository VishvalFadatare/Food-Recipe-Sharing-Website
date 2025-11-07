// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import RecipeCard from '../components/RecipeCard';
// import { Container, Grid, Typography, TextField, Box } from '@mui/material';

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await api.get('/recipes', { params: { search: search } });
//         setRecipes(res.data);
//       } catch (err) {
//         console.error('Error fetching recipes', err);
//       }
//     };
    
//     // Debounce search
//     const timerId = setTimeout(() => {
//         fetchRecipes();
//     }, 500);

//     return () => clearTimeout(timerId);
//   }, [search]);

//   return React.createElement(Container, { sx: { py: 4 } },
//     React.createElement(Typography, { variant: "h2", align: "center", gutterBottom: true },
//       "Find a Recipe"
//     ),
//     React.createElement(Box, { sx: { mb: 4 } },
//       React.createElement(TextField, {
//         fullWidth: true,
//         label: "Search by name or ingredient...",
//         variant: "outlined",
//         value: search,
//         onChange: (e) => setSearch(e.target.value)
//       })
//     ),
//     React.createElement(Grid, { container: true, spacing: 4 },
//       recipes.map((recipe) => 
//         React.createElement(Grid, { item: true, key: recipe._id, xs: 12, sm: 6, md: 4 },
//           React.createElement(RecipeCard, { recipe: recipe })
//         )
//       )
//     )
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { Container, Grid, Typography, TextField, Box } from '@mui/material';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get('/recipes', { params: { search: search } });
        setRecipes(res.data);
      } catch (err) {
        console.error('Error fetching recipes', err);
      }
    };
    
    // Debounce search
    const timerId = setTimeout(() => {
        fetchRecipes();
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  // --- HERO SECTION (NOW THEMED AND FULL-WIDTH) ---
  const HeroSection = React.createElement(Box, { 
      sx: { 
        position: 'relative', 
        backgroundColor: '#FFFFFF', // White background behind text
        pt: { xs: 8, md: 10 }, 
        pb: { xs: 12, md: 15 }, 
        px: { xs: 2, md: 0 }, 
        overflow: 'hidden', 
      } 
    },
    React.createElement(Container, { maxWidth: "lg" }, 
      React.createElement(Grid, { container: true, spacing: 4, alignItems: "center" },
        // --- Left Side: Text ---
        React.createElement(Grid, { item: true, xs: 12, md: 7 }, 
          React.createElement(Box, { 
            sx: { 
              textAlign: { xs: 'center', md: 'left' },
              pr: { md: 4 } 
            } 
          },
            // --- ATTRACTIVE SENTENCE 1 ---
            React.createElement(Typography, { 
              variant: "h2", 
              component: "h1", 
              gutterBottom: true,
              sx: { 
                fontWeight: 700, 
                color: 'primary.main', // Use orange theme color
                fontSize: { xs: '2.5rem', md: '3.5rem' } 
              } 
            }, 
            "Your Next Meal Awaits."),
            
            // --- ATTRACTIVE SENTENCE 2 ---
            React.createElement(Typography, {
              variant: "h5",
              color: "text.secondary", // Use theme secondary text color
              sx: { mb: 4, maxWidth: '600px', mx: { xs: 'auto', md: 'unset' } } 
            },
            "Cook, share, and inspire! Become part of our foodie community and enjoy recipes created by home cooks just like you.")
          )
        ),
        
        // --- Right Side: Image ---
        React.createElement(Grid, { item: true, xs: 12, md: 5 }, 
          React.createElement(Box, {
            component: 'img',
            src: '/18.png', 
            alt: 'Delicious food in a bowl',
            sx: {
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'contain', 
              display: 'block', 
              mx: 'auto' 
            }
          })
        )
      )
    ),
    // --- ORANGE THEME WAVE ---
    React.createElement(Box, {
      component: 'svg',
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1440 320",
      sx: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'auto', 
        zIndex: 0, 
      }
    },
      React.createElement('path', {
        fill: "#fffaf2", // Our light, warm orange theme color
        'fillOpacity': "1",
        d: "M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,218.7C672,245,768,267,864,266.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      })
    )
  );

  // --- Main Page Render (Restructured) ---
  return React.createElement(React.Fragment, null, // Use a Fragment to allow full-width hero
    
    // --- 1. The Hero Section (now full-width) ---
    HeroSection, 

    // --- 2. The Rest of the Page (centered in a container) ---
    React.createElement(Container, { sx: { py: 4 } }, 
      // --- Search Bar Section ---
      React.createElement(Box, { sx: { mb: 4, mt: 4 } }, 
        React.createElement(Typography, { variant: "h4", align: "center", gutterBottom: true },
          "Explore Recipes"
        ),
        React.createElement(TextField, {
          fullWidth: true,
          label: "Search by name or ingredient...",
          variant: "outlined",
          value: search,
          onChange: (e) => setSearch(e.target.value)
        })
      ),
      
      // --- Recipe Grid ---
      React.createElement(Grid, { container: true, spacing: 4 },
        recipes.length > 0
          ? recipes.map((recipe) => 
              React.createElement(Grid, { item: true, key: recipe._id, xs: 12, sm: 6, md: 4 },
                React.createElement(RecipeCard, { recipe: recipe })
              )
            )
          : React.createElement(Grid, { item: true, xs: 12 },
              React.createElement(Typography, { align: 'center', sx: { mt: 4 } },
                "No recipes found. Try a different search!"
              )
            )
      )
    )
  );
};

export default Home;