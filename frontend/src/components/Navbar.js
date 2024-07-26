import React from 'react';
import Logo from './Logo';
import { Link } from "react-router-dom";

import '../styles/LoginSignUpButtons.css'; //
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <ul className="nav-links">
      <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      {/* <button className="login-button">Login</button>
     <button className="signup-button">Sign Up</button> */}
      {/* <LoginSignUpButtons /> */}
    </nav>
  );
};

export default Navbar;


