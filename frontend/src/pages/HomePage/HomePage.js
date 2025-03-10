import React from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import '../../styles/HomePage.css'; // Correct path to HomePage.css

// this part of the project is the home page where i imporeted the components i need for the home

const HomePage = () => {
  return (
    
    <div className="homepage">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;

