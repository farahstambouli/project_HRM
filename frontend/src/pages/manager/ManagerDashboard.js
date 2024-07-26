

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const ManagerDashboard = () => {
  const [managerInfo, setManagerInfo] = useState(null);
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
        const response = await axios.get('http://localhost:3000/manager/loginmanage', {
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

  return (
    <div>
      <h1>Welcome, {managerInfo.name}</h1>
      <p>Email: {managerInfo.email}</p>
      {/* Add more manager info or components here */}
      {/* //div for the managerment of the employee */}
      <div>
      <ul>
          <li>
            <Link to="/manager/employee">Manage Employees</Link><br />
            {/* <Link to="/admin/departments">Manage Departments</Link><br />
            <Link to="/admin/employees">Manage Employees</Link><br />
            <Link to="/admin/reports">Handle Reports</Link><br /> */}
          </li>
          {/* Add more links for other management components here */}
        </ul>
      </div>
    </div>
  );
};

export default ManagerDashboard;
