import React from 'react';
import '../styles/LoginSignUpButtons.css';
import { Link } from 'react-router-dom';

const LoginSignUpButtons = () => {
  return (
    <div className="login-signup-buttons">
    
        <button className="login-btn"> <Link  to="/login">login</Link></button>
      
      {/* <button className="login-btn">Login</button> */}
      <Link to="/register">
        <button className="signup-btn">Sign Up</button>
      </Link>
      {/* <button className="signup-btn">Sign Up</button> */}
    </div>
  );
};

export default LoginSignUpButtons;
