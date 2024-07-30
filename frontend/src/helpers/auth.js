
// Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if the token exists in localStorage
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
