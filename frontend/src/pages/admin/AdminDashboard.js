

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      const token = getToken();
      if (!token) {
        // If no token is found, redirect to login
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
        // If the token is invalid or expired, remove it and redirect to login
        removeToken();
        navigate('/login');
      }
    };

    fetchAdminInfo();
  }, [navigate]);

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {adminInfo.name}</h1>
      <p>Email: {adminInfo.email}</p>
      {/* Add more admin info or components here */}
      {/* //div for the managerment of the managers */}
      <div>
      <ul>
          <li>
            <Link to="/admin/managers">Manage Managers</Link><br />
            <Link to="/admin/departments">Manage Departments</Link><br />
            <Link to="/admin/employees">Manage Employees</Link><br />
            <Link to="/admin/reports">Generate Reports</Link><br />
          </li>
          {/* Add more links for other management components here */}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;


