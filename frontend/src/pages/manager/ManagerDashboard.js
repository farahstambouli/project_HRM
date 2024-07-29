

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../../styles/AdminDashboard.css';
// import Navbar from '../../components/Navbar';
import NavDash from '../../components/NavDash';

import ManageEmployeesM from './ManageEmployeeM'; 
import ManageReports from './ManageReportM';

import '../../styles/AdminDashboard.css';




const ManagerDashboard = () => {
  const [managerInfo, setManagerInfo] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerInfo = async () => {
      const token = getToken();
      if (!token) {
        // If no token is found, redirect to login
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/profile/profile', {
          headers: {
            'x-auth-token': `${token}`,
          },
        });
        setManagerInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch  manager info:', error);
        // If the token is invalid or expired, remove it and redirect to login
        removeToken();
        navigate('/login');
      }
    };

    fetchManagerInfo();
  }, [navigate]);

  if (!managerInfo) {
    return <div>Loading...</div>;
  }
  const renderView = () => {
    switch (currentView) {
      case 'manageEmployees':
        return <ManageEmployeesM />;
      case 'ManageReports':
        return <ManageReports />;
      default:
        return (
          <div>
            <h1>Welcome, {managerInfo.name}</h1>
            <p>Email: {managerInfo.email}</p>
          </div>
        );
    }
  };

  return (
    <div>
    <NavDash /> {/* Include the Navbar component */}
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          {/* <li><button onClick={() => setCurrentView('manageManagers')}>Manage Managers</button></li>
          <li><button onClick={() => setCurrentView('manageDepartments')}>Manage Departments</button></li> */}
          <li><button onClick={() => setCurrentView('manageEmployees')}>Manage Employees</button></li>
          <li><button onClick={() => setCurrentView('ManageReports')}>Manaage Reports</button></li>
        </ul>
      </div>
      <div className="main-content">
        {renderView()}
      </div>
    </div>
  </div>
  );
};

export default ManagerDashboard;
