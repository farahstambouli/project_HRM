import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);

//   const [departments, setDepartments] = useState([]); // State for departments
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(''); // State for selected department
  const [salary, setSalary] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') );
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentManagerId, setCurrentManagerId] = useState('');
 console.log(token)

  useEffect(() => {
    fetchManagers();
    fetchDepartments(); // Fetch departments when component mounts
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/managersprofile', {
        headers: {
            'x-auth-token': `${token}` // Include token in headers
        }
      });
      console.log('Managers data:', response.data); // Add this line to check data
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };
  

  // Fetch all departments from the server
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/department/allDeparts');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };


  const handleAddManager = async (e) => {
    e.preventDefault();
    try {
      const newManager = { name, email, password, role: 'manager',  department: departmentId, salary };
      console.log('Sending data:', newManager);
      await axios.post('http://localhost:3000/manager/registermanager', newManager);
      setName('');
      setEmail('');
      setPassword('');
      setDepartmentId('');
      setSalary(0);
      fetchManagers();
    } catch (error) {
      console.error('Error adding manager:', error);
    }
  };

  const handleDeleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/manager/deletemanager/${id}`);
      fetchManagers();
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const handleUpdateManager = async () => {
    try {
      const updatedManager = {};
      if (name) updatedManager.name = name;
      if (email) updatedManager.email = email;
      if (password) updatedManager.password = password;
      if (departmentId) updatedManager.department = departmentId;
      if (salary) updatedManager.salary = salary;
      
      await axios.put(`http://localhost:3000/manager/updatemanager/${currentManagerId}`, updatedManager, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setName('');
      setEmail('');
      setPassword('');
      setDepartmentId('');
      setSalary(0);
      setIsUpdating(false);
      setCurrentManagerId('');
      fetchManagers();
    } catch (error) {
      console.error('Error updating manager:', error);
    }
  };

  const loadManagerDetails = (manager) => {
    setName(manager.name);
    setEmail(manager.email);
    setPassword(''); // You may want to handle password separately or require re-entry
    setDepartmentId(manager.department);
    setSalary(manager.salary);
    setIsUpdating(true);
    setCurrentManagerId(manager._id);
  };

//   const handleUpdateManager = async (id) => {
//     try {
//       const updatedManager = { name, email, password, role: 'manager', departments, salary };
//       await axios.put(`http://localhost:3000/manager/updatemanager/${id}`, updatedManager, {
//         headers: {
//             'x-auth-token': `${token}` // Include token in headers
//         }
//       });
//       fetchManagers();
//     } catch (error) {
//       console.error('Error updating manager:', error);
//     }
//   };

  return (
    <div>
      <h2>Manage Managers</h2>
      {/* onSubmit={handleAddManager} */}
      <form onSubmit={isUpdating ? handleUpdateManager : handleAddManager}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
  <option value="">Select Department</option>
  {departments.map((department) => (
    <option key={department._id} value={department._id}>
      {department.name}
    </option>
  ))}
</select>
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        {/* <button type="submit">Add Manager</button> */}
        <button type="submit">{isUpdating ? 'Update Manager' : 'Add Manager'}</button>
      </form>
      <h3>Current Managers</h3>
<ul>
 
  {managers.length > 0 ? (
    managers.map((manager) => (
      <li key={manager._id}>
        {manager.name} - {manager.email} - {manager.salary}
        <button onClick={() => loadManagerDetails(manager)} style={{ marginLeft: '10px' }}>Update</button>
        {/* <button onClick={() => handleUpdateManager(manager._id)}>Update</button> */}
        <button onClick={() => handleDeleteManager(manager._id)}>Delete</button>
      </li>
    ))
  ) : (
    <li>No managers found</li>
  )}
</ul>

    </div>
  );
};

export default ManageManagers;


