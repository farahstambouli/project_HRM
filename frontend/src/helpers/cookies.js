//i havent yet used cookies in this project (further thing to impliment later on)
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
