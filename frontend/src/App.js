// src/App.js

import React from 'react';
import { Route, Routes ,Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage/HomePage';
import ManageManagers from './pages/admin/ManageManagers'; 
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageEmployees from './pages/admin/ManageEmployee';
import ManageReports from './pages/admin/ManageReport';
import LoginAdmin from './components/LoginAdmin';
import LoginManager from './components/LoginManager';
import SelectUserType from './components/LoginForm';
// import Navigation from './components/Navigation';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    
      <div>
        {/* <Navigation /> */}
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<SelectUserType />} />
           {/* <Route path="/login" element={<LoginForm />} /> */}
           <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/manager" element={<LoginManager />} />



           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           <Route path="/manager/dashboard" element={<ManagerDashboard />} />



           <Route path="/admin/managers" element={<ManageManagers />} /> 
           <Route path="/admin/departments" element={<ManageDepartments />} />
           <Route path="/admin/employees" element={<ManageEmployees />} />
           <Route path="/admin/reports" element={<ManageReports />} />

          {/* <Route path="/admin/dashboard" element={token ? <AdminDashboard /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        </Routes>
      </div>
 
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import RegisterForm from './components/RegisterForm';
// import LoginForm from './components/LoginForm';
// import AdminDashboard from './pages/admin/AdminDashboard';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


