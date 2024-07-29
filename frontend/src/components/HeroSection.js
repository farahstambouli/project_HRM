// import React from 'react';
// import '../styles/HeroSection.css';

// const HeroSection = () => {
//   return (
//     <section className="hero">
//       <img src="path/to/hero-image.jpg" alt="Hero" className="hero-image" />
//     </section>
//   );
// };

// export default HeroSection;

// HeroSection.jsx

import React from 'react';
import '../styles/HeroSection.css'; // Ensure this path matches your directory structure
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Your company’s new go-to Platefrom</h1>
        <p>Empowering your HR management with modern solutions.</p>
        {/* <a href="#get-started" className="cta-button">Get Started</a> */}
        <Link to="/register" className="cta-button">Get Started</Link>
      </div>
    </section>
  );
};

export default HeroSection;

