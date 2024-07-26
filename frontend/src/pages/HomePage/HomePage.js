import React from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import LoginSignUpButtons from '../../components/LoginSignUpButtons';
import '../../styles/HomePage.css'; // Correct path to HomePage.css

const HomePage = () => {
  return (
    
    <div className="homepage">
      <Navbar />
      <HeroSection />
      {/* <LoginSignUpButtons /> */}
      <Footer />
    </div>
  );
};

export default HomePage;

