// src/App.js

import React from 'react';
import { Route, Routes ,Navigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
// import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage/HomePage';
import ManageManagers from './pages/admin/ManageManagers'; 
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageEmployees from './pages/admin/ManageEmployee';
import ManageReports from './pages/admin/ManageReport';
import LoginAdmin from './components/LoginAdmin';
import LoginManager from './components/LoginManager';
import SelectUserType from './components/LoginForm';
import ManageEmployeesM from './pages/manager/ManageEmployeeM';
import ManageReportM from './pages/manager/ManageReportM';
import AboutPage from './pages/HomePage/AboutPage';
import ContactPage from './pages/HomePage/ContactPage';


const App = () => {
  // const { token } = useSelector((state) => state.auth);

  return (
    
      <div>
       
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<SelectUserType />} />
           {/* <Route path="/login" element={<LoginForm />} /> */}
           <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/manager" element={<LoginManager />} />



           <Route path="/admin/dashboard" element={<AdminDashboard />} />
         
           <Route path="/admin/managers" element={<ManageManagers />} /> 
           <Route path="/admin/departments" element={<ManageDepartments />} />
           <Route path="/admin/employees" element={<ManageEmployees />} />
           <Route path="/admin/reports" element={<ManageReports />} />

           <Route path="/manager/dashboard" element={<ManagerDashboard />} />
           <Route path="/manager/employees" element={<ManageEmployeesM />} />
           <Route path="/manager/reports" element={<ManageReportM />} />

        </Routes>
      </div>
 
  );
};

export default App;



