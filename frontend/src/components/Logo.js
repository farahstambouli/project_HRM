import React from 'react';
import '../styles/Logo.css'; // Style for the logo
import logo from '../assets/images/logo.jpg';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo}  alt="Company Logo" />
    </div>
  );
};

export default Logo;
