// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getToken } from '../../helpers/auth';
// import '../../styles/ManageDepartments.css'; // Import the CSS file

// const ManageDepartments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/department/allDeparts');
//       setDepartments(response.data);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const handleAddDepartment = async (e) => {
//     e.preventDefault();
//     try {
//         const newDepartment = { name, description };

//       await axios.post('http://localhost:3000/department/add', newDepartment);
//       setName('');
//       setDescription('');
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error adding department:', error);
//     }
//   };

//   const handleDeleteDepartment = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/department/delete/${id}`, {
//         headers: {
//           'x-auth-token': getToken(),
//         }
//       });
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error deleting department:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Departments</h2>
//       <form onSubmit={handleAddDepartment}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <label>Description:</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Department</button>
//       </form>
//       <h3>Current Departments</h3>
//       <ul>
//         {departments.length > 0 ? (
//           departments.map((department) => (
//             <li key={department._id}>
//               {department.name}
//               <button onClick={() => handleDeleteDepartment(department._id)} style={{ marginLeft: '10px' }}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <li>No departments found</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ManageDepartments;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/auth';
import '../../styles/ManageDepartments.css'; // Import the CSS file

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/department/allDeparts');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const newDepartment = { name, description };
      await axios.post('http://localhost:3000/department/add', newDepartment);
      setName('');
      setDescription('');
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/department/delete/${id}`, {
        headers: {
          'x-auth-token': getToken(),
        }
      });
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="container">
    <div className="card manage-card">
      <h2>Manage Departments</h2>
      <form onSubmit={handleAddDepartment} className="manager-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Department</button>
      </form>
    </div>
    <div className="card departments-card">
      <h3>Current Departments</h3>
      <ul className="managers-list">
        {departments.length > 0 ? (
          departments.map((department) => (
            <li key={department._id} className="manager-item">
              {department.name}
              <button onClick={() => handleDeleteDepartment(department._id)} className="delete-button">Delete</button>
            </li>
          ))
        ) : (
          <li>No departments found</li>
        )}
      </ul>
    </div>
  </div>
  );
};

export default ManageDepartments;
