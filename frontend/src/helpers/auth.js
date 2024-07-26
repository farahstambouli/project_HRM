// import { getCookie, setCookie } from "./cookies";
// import { getLocalStorage, setLocalStorage } from "./localStorage";

// export const setAuthentification =(user,token)=>{
//     setLocalStorage('user',user);
//     setCookie('token',token)
// }

// export const isAuthenticated =()=>{

//     const cookie = getCookie('token');

//     if(cookie && getLocalStorage('user')){
//         return getLocalStorage('user')
//     }else{
//         return false
//     }
// }

// src/helpers/auth.js

// export const authenticateUser = async (credentials) => {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to authenticate');
//     }
  
//     return await response.json();
//   };
  // helpers/auth.js

// import { setToken as setLocalStorageToken, getToken as getLocalStorageToken, removeToken as removeLocalStorageToken } from './localStorage';
// import { setToken as setCookieToken, getToken as getCookieToken, removeToken as removeCookieToken } from './cookies';

// export const setToken = (token) => {
//   setLocalStorageToken(token);
//   setCookieToken(token);
// };

// export const getToken = () => {
//   return getLocalStorageToken() || getCookieToken();
// };

// export const removeToken = () => {
//   removeLocalStorageToken();
//   removeCookieToken();
// };
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
