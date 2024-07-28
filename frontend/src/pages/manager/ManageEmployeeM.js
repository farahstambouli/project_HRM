// // src/pages/manager/ManageEmployees.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const ManageEmployeesM = () => {
//     const [employees, setEmployees] = useState([]);
//     const { user } = useSelector((state) => state.auth); // Assuming user details are stored in the auth state

//     useEffect(() => {
//         const fetchEmployees = async (id) => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/getEmployee/${id}/employees`, {
//                     headers: {
//                         'x-auth-token': ` ${localStorage.getItem('token')}`, // or however you store your token
//                     }
//                 });
//                 setEmployees(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch employees:', error);
//             }
//         };

//         fetchEmployees();
//     }, [user.id]);

//     return (
//         <div>
//             <h2>Manage Employees</h2>
//             <ul>
//                 {employees.map(employee => (
//                     <li key={employee.id}>{employee.name} - {employee.position}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ManageEmployeesM;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Manage Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployeesM;
