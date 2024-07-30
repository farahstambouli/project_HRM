//footer of the plateform (very basic can add more functionality or icons)
// Footer.jsx

import React from 'react';
import '../styles/Footer.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact us: <a href="mailto:contact@hrplatform.com">contact@HRHarmony.com</a></p>
        <p>&copy; {new Date().getFullYear()} HR Harmony. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

