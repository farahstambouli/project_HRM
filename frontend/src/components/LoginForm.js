// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { setToken } from '../helpers/auth';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/admin/login', { email, password });
//       console.log('Login successful');
//       console.log(response.data); 
//       console.log(response.data.token);

//       // Store the token
//       setToken(response.data.token);

//       // Redirect to the dashboard or another page
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Failed to login:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { setToken } from '../helpers/auth';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('');
//   const navigate = useNavigate();
//   console.log(userType)
//   console.log(email)

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     const endpoint = userType === 'admin' ? 'http://localhost:3000/admin/login' : 'http://localhost:3000/manager/loginmanager';

//     try {
//       const response = await axios.post(endpoint, { email, password });
//       setToken(response.data.token);
//       if (userType === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/manager/dashboard');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Failed to login:', error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <div>
//         <label>
//           User Type:
//           {/* <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            
//             <option value="admin">Admin</option>
//             <option value="manager">Manager</option>
//           </select> */}
//         </label>
//         <input type="text" value={userType} onChange={(e) =>setUserType(e.target.value)} required />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
//loginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Make sure the path is correct

const SelectUserType = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSelection = (type) => {
    setUserType(type);
    if (type === 'admin') {
      navigate('/login/admin');
    } else {
      navigate('/login/manager');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Select User Type</h2>
        <button onClick={() => handleSelection('admin')}>Admin</button>
        <button onClick={() => handleSelection('manager')}>Manager</button>
      </div>
    </div>
  );
};

export default SelectUserType;


