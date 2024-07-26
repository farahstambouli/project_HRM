// export const setLocalStorage =(key,value)=>{
//     localStorage.setItem(key,JSON.stringify(value))
//     }
    
//     export const getLocalStorage =(key)=>{
//         return JSON.parse(localStorage.getItem(key))
//         }

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
  