// import React from 'react';
// import Logo from './Logo';
// import { Link } from "react-router-dom";
// import '../styles/Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <Logo />
//       <ul className="nav-links">
    
//         <li><a href="#home">Home</a></li>
//         <li><a href="#contact">Contact</a></li>
//         <li><a href="#about">About</a></li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/register">Register</Link>
//         </li>
//       </ul>
      
//     </nav>
//   );
// };

// export default Navbar;
// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
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
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/register" className="nav-button">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;



