import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavDash.css'; // Ensure this path is correct

const NavDash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any other logout logic
    localStorage.removeItem('token');
    // Redirect to homepage
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">HR Harmony</span>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="nav-button">Logout</button>
      </div>
    </nav>
  );
};

export default NavDash;

