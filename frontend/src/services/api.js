// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Backend URL
// });

// // Interceptor to add the token to all requests
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['x-auth-token'] = token;
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

// Get the base URL from the environment variable (Netlify)
// If the variable isn't set (like on your local computer), 
// it will fall back to using http://localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  // Use the new API_URL variable here
  baseURL: `${API_URL}/api`
});

// Interceptor to add the token to all requests
// (Your existing code, which is perfect)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;