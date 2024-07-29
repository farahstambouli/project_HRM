// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [departmentId, setDepartmentId] = useState('');
//   const [managerId, setManagerId] = useState('');
//   const [salary, setSalary] = useState(0);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [currentEmployeeId, setCurrentEmployeeId] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//     fetchDepartments();
//     fetchManagers();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/admin/employeesprofile', {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/department/allDeparts');
//       setDepartments(response.data);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const fetchManagers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/admin/managersprofile', {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setManagers(response.data);
//     } catch (error) {
//       console.error('Error fetching managers:', error);
//     }
//   };

//   const handleAddEmployee = async (e) => {
//     e.preventDefault();
//     try {
//       const newEmployee = { name, email, password, department: departmentId, manager: managerId, salary };
//       await axios.post('http://localhost:3000/employees/registeremployee', newEmployee, {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setName('');
//       setEmail('');
//       setPassword('');
//       setDepartmentId('');
//       setManagerId('');
//       setSalary(0);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     }
//   };

//   const handleDeleteEmployee = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/employees/deleteemployee/${id}`, {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };

//   const handleUpdateEmployee = async () => {
//     try {
//       const updatedEmployee = {};
//       if (name) updatedEmployee.name = name;
//       if (email) updatedEmployee.email = email;
//       if (password) updatedEmployee.password = password;
//       if (departmentId) updatedEmployee.department = departmentId;
//       if (managerId) updatedEmployee.manager = managerId;
//       if (salary) updatedEmployee.salary = salary;

//       await axios.put(`http://localhost:3000/employees/updateemployee/${currentEmployeeId}`, updatedEmployee, {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setName('');
//       setEmail('');
//       setPassword('');
//       setDepartmentId('');
//       setManagerId('');
//       setSalary(0);
//       setIsUpdating(false);
//       setCurrentEmployeeId('');
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error updating employee:', error);
//     }
//   };

//   const loadEmployeeDetails = (employee) => {
//     setName(employee.name);
//     setEmail(employee.email);
//     setPassword(''); // You may want to handle password separately or require re-entry
//     setDepartmentId(employee.department);
//     setManagerId(employee.manager);
//     setSalary(employee.salary);
//     setIsUpdating(true);
//     setCurrentEmployeeId(employee._id);
//   };

//   return (
//     <div>
//       <h2>Manage Employees</h2>
//       <form onSubmit={isUpdating ? handleUpdateEmployee : handleAddEmployee}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Department:</label>
//           <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
//             <option value="">Select Department</option>
//             {departments.map((department) => (
//               <option key={department._id} value={department._id}>
//                 {department.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Manager:</label>
//           <select value={managerId} onChange={(e) => setManagerId(e.target.value)} required>
//             <option value="">Select Manager</option>
//             {managers.map((manager) => (
//               <option key={manager._id} value={manager._id}>
//                 {manager.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Salary:</label>
//           <input
//             type="number"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">{isUpdating ? 'Update Employee' : 'Add Employee'}</button>
//       </form>
//       <h3>Current Employees</h3>
//       <ul>
//         {employees.length > 0 ? (
//           employees.map((employee) => (
//             <li key={employee._id}>
//               {employee.name} - {employee.email} - {employee.salary}
//               <button onClick={() => loadEmployeeDetails(employee)} style={{ marginLeft: '10px' }}>Update</button>
//               <button onClick={() => handleDeleteEmployee(employee._id)} style={{ marginLeft: '10px' }}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <li>No employees found</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ManageEmployees;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ManageEmployees.css'; // Import the CSS file for styles

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [managerId, setManagerId] = useState('');
  const [salary, setSalary] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchManagers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/employeesprofile', {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/department/allDeparts');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

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

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { name, email, password, department: departmentId, manager: managerId, salary };
      await axios.post('http://localhost:3000/employees/registeremployee', newEmployee, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/employees/deleteemployee/${id}`, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const updatedEmployee = {};
      if (name) updatedEmployee.name = name;
      if (email) updatedEmployee.email = email;
      if (password) updatedEmployee.password = password;
      if (departmentId) updatedEmployee.department = departmentId;
      if (managerId) updatedEmployee.manager = managerId;
      if (salary) updatedEmployee.salary = salary;

      await axios.put(`http://localhost:3000/employees/updateemployee/${currentEmployeeId}`, updatedEmployee, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const loadEmployeeDetails = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setPassword(''); // Handle password separately or require re-entry
    setDepartmentId(employee.department);
    setManagerId(employee.manager);
    setSalary(employee.salary);
    setIsUpdating(true);
    setCurrentEmployeeId(employee._id);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setDepartmentId('');
    setManagerId('');
    setSalary(0);
    setIsUpdating(false);
    setCurrentEmployeeId('');
  };

  const handleCloseModal = () => {
    resetForm();
  };

  return (
    <div className="manage-employees-container">
      <div className="employee-form-card">
        <h2>{isUpdating ? 'Update Employee' : 'Add Employee'}</h2>
        <form onSubmit={isUpdating ? handleUpdateEmployee : handleAddEmployee}>
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
            <label>Manager:</label>
            <select value={managerId} onChange={(e) => setManagerId(e.target.value)} required>
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.name}
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
          <button type="submit">{isUpdating ? 'Update Employee' : 'Add Employee'}</button>
        </form>
      </div>

      <div className="employees-list-card">
        <h3>Current Employees</h3>
        <ul>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <li key={employee._id}>
                {employee.name} - {employee.email} - {employee.salary}
                <div className="employee-actions">
                  <button onClick={() => loadEmployeeDetails(employee)}>Update</button>
                  <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <li>No employees found</li>
          )}
        </ul>
      </div>

      {isUpdating && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Employee</h2>
            <form onSubmit={handleUpdateEmployee}>
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
                <label>Manager:</label>
                <select value={managerId} onChange={(e) => setManagerId(e.target.value)} required>
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name}
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
              <button type="submit">Update Employee</button>
              <button type="button" onClick={handleCloseModal} className="close-button">Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
