// src/pages/ContactPage/ContactPage.jsx
//contains the way the client can contact us
import React from 'react';
import '../../styles/ContactPage.css';
import Navbar from '../../components/Navbar';


const ContactPage = () => {
  return (
    
    <div className="contact-container">
      <Navbar/>
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p>If you need any help or have any questions, please feel free to reach out to us. We are here to assist you!</p>
        
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
          
          <input type="submit" value="Send Message" />
        </form>
        
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> 123 Main Street, Anytown, Anycountry</p>
          <p><strong>Phone:</strong> +123-456-7890</p>
          <p><strong>Email:</strong> <a href="mailto:contact@hrplatform.com">contact@HRHarmony.com</a></p>
          <p>Follow us on <a href="https://twitter.com/yourcompany">Twitter</a>, <a href="https://facebook.com/yourcompany">Facebook</a>, and <a href="https://linkedin.com/company/yourcompany">LinkedIn</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
