// import React from 'react';
// import '../styles/Footer.css';


// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;
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

