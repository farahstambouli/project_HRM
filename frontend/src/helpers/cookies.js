// import cookies from "js-cookie";

// export const getCookie = (key)=>{
//     return cookies.get(key)
// }

// export const setCookie = (key,value)=>{
//     cookies.set(key,value,{expires:1})
// }
// export const deleteCookie = key=>{

//     return cookies.remove(key);
// }

// helpers/cookies.js

import Cookies from 'js-cookie';

export const setToken = (token) => {
  Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
};

export const getToken = () => {
  return Cookies.get('authToken');
};

export const removeToken = () => {
  Cookies.remove('authToken');
};
