// // src/pages/manager/ManageEmployees.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import  '../../styles/ManageEmployeesM.css'

const ManageEmployeesM = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = getToken();
      if (!token) {
        // If no token is found, redirect to login
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/getEmployee/employeesM', {
          headers: {
            'x-auth-token': token,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        // If the token is invalid or expired, remove it and redirect to login
        removeToken();
        navigate('/login');
      }
    };

    fetchEmployees();
  }, [navigate]);

  if (employees.length === 0) {
    return <div>Loading...</div>;
  }

  return (
 
    <div className="manage-employees-container">
    <h1>Manage Employees</h1>
    <ul className="employees-list">
      {employees.map((employee) => (
        <li key={employee._id} className="employee-item">{employee.name}</li>
      ))}
    </ul>
  </div>
  );
};

export default ManageEmployeesM;
