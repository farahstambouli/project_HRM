
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ManageManagers.css'; // Import the CSS file for modal and button styles

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [salary, setSalary] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentManagerId, setCurrentManagerId] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchManagers();
    fetchDepartments();
  }, []);
// fonction that fetch the admin profile
  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/managersprofile', {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };
 // fonction that fetch the departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/department/allDeparts');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // fonction to add a manager
  const handleAddManager = async (e) => {
    e.preventDefault();
    try {
      const newManager = { name, email, password, role: 'manager', department: departmentId, salary };
      await axios.post('http://localhost:3000/manager/registermanager', newManager);
      resetForm();
      fetchManagers();
    } catch (error) {
      console.error('Error adding manager:', error);
    }
  };
 // focntion to delete a manager
  const handleDeleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/manager/deletemanager/${id}`);
      fetchManagers();
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };
// fonction to update a manager
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
      resetForm();
      setShowModal(false);
      fetchManagers();
    } catch (error) {
      console.error('Error updating manager:', error);
    }
  };
// fonction that displays the manager
  const loadManagerDetails = (manager) => {
    setName(manager.name);
    setEmail(manager.email);
    setPassword(''); // Handle password separately or require re-entry
    setDepartmentId(manager.department);
    setSalary(manager.salary);
    setIsUpdating(true);
    setCurrentManagerId(manager._id);
    setShowModal(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setDepartmentId('');
    setSalary(0);
    setIsUpdating(false);
    setCurrentManagerId('');
  };

  return (
    <div>
      <h2>Manage Managers</h2>
      <form className="manager-form" onSubmit={isUpdating ? handleUpdateManager : handleAddManager}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Department:</label>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>{department.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
        <button type="submit">{isUpdating ? 'Update Manager' : 'Add Manager'}</button>
      </form>

      <h3>Current Managers</h3>
      <div className="managers-list">
        {managers.length > 0 ? (
          managers.map((manager) => (
            <div className="manager-item" key={manager._id}>
              <p>{manager.name} - {manager.email} - {manager.salary}</p>
              <div className="button-container">
                <button className="update-button" onClick={() => loadManagerDetails(manager)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteManager(manager._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No managers found</p>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isUpdating ? 'Update Manager' : 'Add Manager'}</h2>
            <form onSubmit={handleUpdateManager}>
              <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <label>Department:</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>{department.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Salary:</label>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
              </div>
              <button type="submit">{isUpdating ? 'Update Manager' : 'Add Manager'}</button>
              <button type="button" className="close-modal" onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageManagers;
