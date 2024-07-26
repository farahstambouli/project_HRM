import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
