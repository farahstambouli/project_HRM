//this file is a locol storage where we store the token for the usrs( admin or manager)
// helpers/localStorage.js

export const setToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  