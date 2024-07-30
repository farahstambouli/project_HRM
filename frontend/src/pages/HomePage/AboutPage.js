// src/pages/HomePage/AboutPage.jsx
//tell the clients more about our services

import React from 'react';
import '../../styles/AboutPage.css';
import teamMember1 from '../../assets/images/team-member1.jpeg'; // Ensure you have the images in the assets folder
import teamMember2 from '../../assets/images/team-member2.jpeg';
import teamMember3 from '../../assets/images/team-member3.jpeg';
import Navbar from '../../components/Navbar';

// src/pages/HomePage/AboutPage.jsx


const AboutPage = () => {
  return (
    <div className="about-container">
      <Navbar/>
      <div className="about-page">
        <div className="about-hero">
          <h1>About Us</h1>
          <p>Welcome to HR Harmony, where we revolutionize human resources management!</p>
        </div>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>Our mission is to streamline HR operations for businesses of all sizes by providing a comprehensive platform that simplifies employee management, payroll processing, leave tracking, and more. We aim to empower HR teams with tools that drive efficiency and enhance the overall employee experience.</p>
        </div>
        
        <div className="about-section">
          <h2>Our History</h2>
          <p>Founded in 2020, our journey began with a vision to transform HR management through innovative technology. Starting with a small team of passionate developers and HR professionals, we have grown into a leading provider of HR solutions. Over the years, we have continuously evolved our platform to meet the changing needs of businesses and their employees.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Integrity:</strong> We uphold the highest standards of honesty and transparency in all our interactions.</li>
            <li><strong>Innovation:</strong> We embrace new technologies and ideas to keep our platform at the forefront of HR management.</li>
            <li><strong>Customer Focus:</strong> Our users are at the heart of everything we do, and we strive to exceed their expectations.</li>
            <li><strong>Excellence:</strong> We are dedicated to delivering high-quality solutions and exceptional service.</li>
          </ul>
        </div>
        
        <div className="about-section team-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={teamMember1} alt="John Doe" />
              <h3>John Doe</h3>
              <p>CEO - With over a decade of experience in HR and technology, John leads our company with a focus on innovation and strategic growth.</p>
            </div>
            <div className="team-member">
              <img src={teamMember2} alt="Jane Smith" />
              <h3>Jane Smith</h3>
              <p>CTO - Jane oversees our technological advancements and ensures our platform remains cutting-edge and reliable.</p>
            </div>
            <div className="team-member">
              <img src={teamMember3} alt="Emily Johnson" />
              <h3>Emily Johnson</h3>
              <p>COO - Emily manages our operations, ensuring smooth workflows and exceptional service delivery to our clients.</p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>Achievements</h2>
          <ul>
            <li>Named one of the Top 50 HR Solutions Providers by HR Magazine in 2024</li>
            <li>Featured in Forbes for Innovative HR Technology Solutions in 2023</li>
            <li>Won the HR Tech Award for Best Employee Engagement Platform in 2022</li>
            <li>Expanded client base to over 1,000 companies, serving over 20,000 employees globally</li>
            <li>Introduced groundbreaking AI-powered features that increased HR efficiency by 30% in 2021</li>
          </ul>
        </div>
        
        <div className="about-section contact-section">
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Whether you have questions, feedback, or are interested in our services, feel free to get in touch:</p>
          <p><strong>Address:</strong> 123 HR Lane, Suite 456, Business City, Country</p>
          <p><strong>Phone:</strong> +123-456-7890</p>
          <p><strong>Email:</strong> <a href="mailto:contact@hrplatform.com">contact@HRHarmony.com</a></p>
          <p>Follow us on <a href="https://twitter.com/yourcompany">Twitter</a>, <a href="https://facebook.com/yourcompany">Facebook</a>, and <a href="https://linkedin.com/company/yourcompany">LinkedIn</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
