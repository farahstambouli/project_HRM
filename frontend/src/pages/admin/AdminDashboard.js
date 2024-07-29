

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getToken, removeToken } from '../../helpers/auth';
// import { Routes, Route,useNavigate } from 'react-router-dom';
// import {Link} from 'react-router-dom';
// import '../../styles/AdminDashboard.css'; // Make sure to create this CSS file
// import ManageManagers from './ManageManagers';
// import ManageDepartments from './ManageDepartments';
// import ManageEmployees from './ManageEmployee';
// import ManageReports from './ManageReport';
// import Navbar from '../../components/Navbar'; // Import the Navbar component



// const AdminDashboard = () => {
//   const [adminInfo, setAdminInfo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAdminInfo = async () => {
//       const token = getToken();
//       if (!token) {
//         // If no token is found, redirect to login
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:3000/admin/currentAdmin', {
//           headers: {
//             'x-auth-token': `${token}`,
//           },
//         });
//         setAdminInfo(response.data);
//       } catch (error) {
//         console.error('Failed to fetch admin info:', error);
//         // If the token is invalid or expired, remove it and redirect to login
//         removeToken();
//         navigate('/login');
//       }
//     };

//     fetchAdminInfo();
//   }, [navigate]);

//   if (!adminInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="admin-dashboard">
//        <Navbar /> {/* Include the Navbar component */}
//       <div className="sidebar">
//         <h2>Admin Dashboard</h2>
//         <ul>
          
//           <li><Link to="/admin/departments">Manage Departments</Link></li>
//           <li><Link to="/admin/managers">Manage Managers</Link></li>
//           <li><Link to="/admin/employees">Manage Employees</Link></li>
//           <li><Link to="/admin/reports">Manage Reports</Link></li>
//         </ul>
//       </div>
//       <div className="main-content">
//         <h1>Welcome, {adminInfo.name}</h1>
//         <p>Email: {adminInfo.email}</p>
//         <Routes>
//           <Route path="managers" element={<ManageManagers />} />
//           <Route path="departments" element={<ManageDepartments />} />
//           <Route path="employees" element={<ManageEmployees />} />
//           <Route path="reports" element={<ManageReports />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../helpers/auth';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
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
      <Navbar /> {/* Include the Navbar component */}
      <div className="admin-dashboard">
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <ul>
            <li><button onClick={() => setCurrentView('manageManagers')}>Manage Managers</button></li>
            <li><button onClick={() => setCurrentView('manageDepartments')}>Manage Departments</button></li>
            <li><button onClick={() => setCurrentView('manageEmployees')}>Manage Employees</button></li>
            <li><button onClick={() => setCurrentView('generateReports')}>Manaage Reports</button></li>
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

