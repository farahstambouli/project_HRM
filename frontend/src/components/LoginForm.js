//this component is for the login part
//it choose between admin or manager and depending on the choice it will take you to the corresponding page
//loginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Make sure the path is correct
import Navbar from './Navbar';



const SelectUserType = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSelection = (type) => {
    setUserType(type);
    if (type === 'admin') {
      navigate('/login/admin');
    } else {
      navigate('/login/manager');
    }
  };

  return (
    <div className="login-container">
      <Navbar/>
      <div className="login-card">
        <h2>Select User Type</h2>
        <button onClick={() => handleSelection('admin')}>Admin</button>
        <button onClick={() => handleSelection('manager')}>Manager</button>
      </div>
    </div>
  );
};

export default SelectUserType;


