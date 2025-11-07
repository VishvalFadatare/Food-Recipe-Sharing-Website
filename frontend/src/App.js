// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddRecipe from './pages/AddRecipe';
// import MyRecipes from './pages/MyRecipes';
// import AdminDashboard from './pages/AdminDashboard';
// import Navbar from './components/Navbar';

// // Import Protected Routes
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';

// function App() {
//   return React.createElement('div', { className: 'App' },
//     React.createElement(Navbar, null),
//     React.createElement(ToastContainer, null),
//     React.createElement(Routes, null,
//       // Public Routes
//       React.createElement(Route, { path: "/", element: React.createElement(Home) }),
//       React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
//       React.createElement(Route, { path: "/register", element: React.createElement(Register) }),

//       // User Protected Routes
//       React.createElement(Route, { element: React.createElement(PrivateRoute) },
//         React.createElement(Route, { path: "/add-recipe", element: React.createElement(AddRecipe) }),
//         React.createElement(Route, { path: "/my-recipes", element: React.createElement(MyRecipes) })
//       ),

//       // Admin Protected Routes
//       React.createElement(Route, { element: React.createElement(AdminRoute) },
//         React.createElement(Route, { path: "/admin", element: React.createElement(AdminDashboard) })
//       )
      
//       // Add RecipeDetails route here later
//     )
//   );
// }

// export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddRecipe from './pages/AddRecipe';
// import MyRecipes from './pages/MyRecipes';
// import AdminDashboard from './pages/AdminDashboard';
// import EditRecipe from './pages/EditRecipe'; // <--- IMPORTED
// import Navbar from './components/Navbar';

// // Import Protected Routes
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';

// function App() {
//   return React.createElement('div', { className: 'App' },
//     React.createElement(Navbar, null),
//     React.createElement(ToastContainer, null),
//     React.createElement(Routes, null,
//       // Public Routes
//       React.createElement(Route, { path: "/", element: React.createElement(Home) }),
//       React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
//       React.createElement(Route, { path: "/register", element: React.createElement(Register) }),

//       // User Protected Routes
//       React.createElement(Route, { element: React.createElement(PrivateRoute) },
//         React.createElement(Route, { path: "/add-recipe", element: React.createElement(AddRecipe) }),
//         React.createElement(Route, { path: "/my-recipes", element: React.createElement(MyRecipes) }),
//         React.createElement(Route, { path: "/edit-recipe/:id", element: React.createElement(EditRecipe) }) // <--- ADDED
//       ),

//       // Admin Protected Routes
//       React.createElement(Route, { element: React.createElement(AdminRoute) },
//         React.createElement(Route, { path: "/admin", element: React.createElement(AdminDashboard) })
//       )
      
//       // Add RecipeDetails route here later
//     )
//   );
// }

// export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddRecipe from './pages/AddRecipe';
// import MyRecipes from './pages/MyRecipes';
// import AdminDashboard from './pages/AdminDashboard';
// import EditRecipe from './pages/EditRecipe';
// import RecipeDetails from './pages/RecipeDetails'; // <--- IMPORT THIS

// // Import Protected Routes
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// import Navbar from './components/Navbar';

// function App() {
//   return React.createElement('div', { className: 'App' },
//     React.createElement(Navbar, null),
//     React.createElement(ToastContainer, null),
//     React.createElement(Routes, null,
//       // Public Routes
//       React.createElement(Route, { path: "/", element: React.createElement(Home) }),
//       React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
//       React.createElement(Route, { path: "/register", element: React.createElement(Register) }),
//       React.createElement(Route, { path: "/recipe/:id", element: React.createElement(RecipeDetails) }), // <--- ADD THIS LINE

//       // User Protected Routes
//       React.createElement(Route, { element: React.createElement(PrivateRoute) },
//         React.createElement(Route, { path: "/add-recipe", element: React.createElement(AddRecipe) }),
//         React.createElement(Route, { path: "/my-recipes", element: React.createElement(MyRecipes) }),
//         React.createElement(Route, { path: "/edit-recipe/:id", element: React.createElement(EditRecipe) })
//       ),

//       // Admin Protected Routes
//       React.createElement(Route, { element: React.createElement(AdminRoute) },
//         React.createElement(Route, { path: "/admin", element: React.createElement(AdminDashboard) })
//       )
//     )
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddRecipe from './pages/AddRecipe';
import MyRecipes from './pages/MyRecipes';
import AdminDashboard from './pages/AdminDashboard';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';
import Navbar from './components/Navbar';

// Import Protected Routes
// import PrivateRoute from './components/PrivateRoute'; // We don't need this anymore
import UserRoute from './components/UserRoute';     // <--- IMPORT THIS
import AdminRoute from './components/AdminRoute';

function App() {
  return React.createElement('div', { className: 'App' },
    React.createElement(Navbar, null),
    React.createElement(ToastContainer, null),
    React.createElement(Routes, null,
      // Public Routes
      React.createElement(Route, { path: "/", element: React.createElement(Home) }),
      React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
      React.createElement(Route, { path: "/register", element: React.createElement(Register) }),
      React.createElement(Route, { path: "/recipe/:id", element: React.createElement(RecipeDetails) }),

      // --- UPDATED ---
      // User Protected Routes (Admins CANNOT access)
      React.createElement(Route, { element: React.createElement(UserRoute) },
        React.createElement(Route, { path: "/add-recipe", element: React.createElement(AddRecipe) }),
        React.createElement(Route, { path: "/my-recipes", element: React.createElement(MyRecipes) }),
        React.createElement(Route, { path: "/edit-recipe/:id", element: React.createElement(EditRecipe) })
      ),

      // Admin Protected Routes (Users CANNOT access)
      React.createElement(Route, { element: React.createElement(AdminRoute) },
        React.createElement(Route, { path: "/admin", element: React.createElement(AdminDashboard) })
      )
    )
  );
}

export default App;