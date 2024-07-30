
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
import NavDash from '../../components/NavDash';
import ManageManagers from './ManageManagers';
import ManageDepartments from './ManageDepartments';
import ManageEmployee from './ManageEmployee';
import ManageReport from './ManageReport';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/currentAdmin', {
          headers: {
            'x-auth-token': `${token}`,
          },
        });
        setAdminInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch admin info:', error);
        removeToken();
        navigate('/login');
      }
    };

    fetchAdminInfo();
  }, [navigate]);

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  const renderView = () => {
    switch (currentView) {
      case 'manageManagers':
        return <ManageManagers />;
      case 'manageDepartments':
        return <ManageDepartments />;
      case 'manageEmployees':
        return <ManageEmployee />;
      case 'generateReports':
        return <ManageReport />;
      default:
        return (
          <div>
            <h1>Welcome, {adminInfo.name}</h1>
            <p>Email: {adminInfo.email}</p>
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
            <li><button onClick={() => setCurrentView('manageManagers')}>Manage Managers</button></li>
            <li><button onClick={() => setCurrentView('manageDepartments')}>Manage Departments</button></li>
            <li><button onClick={() => setCurrentView('manageEmployees')}>Manage Employees</button></li>
            <li><button onClick={() => setCurrentView('generateReports')}>Manage Reports</button></li>
          </ul>
        </div>
        <div className="main-content">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

