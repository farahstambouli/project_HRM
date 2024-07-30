// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../styles/ManageReportsM.css'



// const ManageReports = () => {
//   const [reports, setReports] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [type, setType] = useState('');
//   const [details, setDetails] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [receiverId, setReceiverId] = useState('');
//   const [receiverModel, setReceiverModel] = useState('Admin');
//   const [senderId, setSenderId] = useState('');
//   const [senderModel, setSenderModel] = useState('Manager');
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [isFetching, setIsFetching] = useState(true);


//   useEffect(() => {
//     fetchReports();
//     fetchEmployees();
//     fetchAdmins();
//   }, []);

//   const fetchReports = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.get('http://localhost:3000/reports/allreports', {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//     setIsFetching(false);
//   };

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

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/profile/profileAdmin', {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setAdmin(response.data);
//     } catch (error) {
//       console.error('Error fetching admin:', error);
//     }
//   };

//   const handleSubmitReport = async (e) => {
//     e.preventDefault();
//     console.log({
//       type,
//       details,
//       employeeId,
//       receiverId,
//       receiverModel,
//       senderModel
//     });
//     try {
//       await axios.post('http://localhost:3000/reports/submit', {
//         type,
//         details,
//         employeeId,
//         receiverId,
//         receiverModel,
//         senderId,
//         senderModel
//       }, {
//         headers: {
//           'x-auth-token': `${token}`
//         }
//       });
//       setType('');
//       setDetails('');
//       setEmployeeId('');
//       setReceiverId('');
//       setReceiverModel('Admin');
//       setSenderId('');
//       setSenderModel('Manager');
//       fetchReports();
//     } catch (error) {
//       console.error('Error submitting report:', error);
//     }
//   };

//   // const handleFilterBySender = async (senderId) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:3000/report/manager/${senderId}`, {
//   //       headers: {
//   //         'x-auth-token': `${token}`
//   //       }
//   //     });
//   //     setReports(response.data);
//   //   } catch (error) {
//   //     console.error('Error filtering reports by sender:', error);
//   //   }
//   // };

//   // const handleFilterByEmployee = async (employeeId) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:3000/report/employee/${employeeId}`, {
//   //       headers: {
//   //         'x-auth-token': `${token}`
//   //       }
//   //     });
//   //     setReports(response.data);
//   //   } catch (error) {
//   //     console.error('Error filtering reports by employee:', error);
//   //   }
//   // };

//   return (
//     // 
//     <div className="manage-reports-container">
//       <h2>Manage Reports</h2>
//       <form onSubmit={handleSubmitReport}>
//         {/* Form fields */}
//         <div>
//           <label>Type:</label>
//           <select value={type} onChange={(e) => setType(e.target.value)} required>
//             <option value="">Select Report Type</option>
//             <option value="presence">Presence</option>
//             <option value="absence">Absence</option>
//             <option value="leave">Leave</option>
//             <option value="situation">Situation</option>
//           </select>
//         </div>
//         <div>
//           <label>Details:</label>
//           <textarea
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Employee:</label>
//           <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Receiver:</label>
//           <select value={receiverId} onChange={(e) => setReceiverId(e.target.value)} required>
//             <option value="">Select Receiver</option>
//             {admin.map((admin) => (
//               <option key={admin._id} value={admin._id}>
//                 {admin.name} (admin)
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Sender:</label>
//           <input
//             type="text"
//             value={senderId}
//             onChange={(e) => setSenderId(e.target.value)}
//             placeholder="Sender ID"
//             required
//           />
//         </div>
//         <div>
//           <label>Sender Role:</label>
//           <select value={senderModel} onChange={(e) => setSenderModel(e.target.value)} required>
//             <option value="Admin">Admin</option>
//             <option value="Manager">Manager</option>
//           </select>
//         </div>
//         <button type="submit">Submit Report</button>
//       </form>
      
//       <h3>All Reports</h3>
//       {isFetching ? (
//         <p className="loading">Loading...</p>
//       ) : (
//         <ul className="reports-list">
//           {reports.length > 0 ? (
//             reports.map((report) => (
//               <li className="report-item" key={report._id}>
//                 <strong>Type:</strong> {report.type} - <strong>Details:</strong> {report.details} - <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
//               </li>
//             ))
//           ) : (
//             <li className="report-item">No reports found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ManageReports;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ManageReportsM.css'

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverModel, setReceiverModel] = useState('Admin');
  const [senderId, setSenderId] = useState('');
  const [senderModel, setSenderModel] = useState('Manager');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchReports();
    fetchEmployees();
    fetchAdmins();
  }, []);

  const fetchReports = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('http://localhost:3000/reports/allreports', {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
    setIsFetching(false);
  };

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

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile/profileAdmin', {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    console.log({
      type,
      details,
      employeeId,
      receiverId,
      receiverModel,
      senderModel
    });
    try {
      await axios.post('http://localhost:3000/reports/submit', {
        type,
        details,
        employeeId,
        receiverId,
        receiverModel,
        // senderId,
        senderModel
      }, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setType('');
      setDetails('');
      setEmployeeId('');
      setReceiverId('');
      setReceiverModel('Admin');
      // setSenderId('');
      setSenderModel('Manager');
      fetchReports();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="manage-reports-container">
      <div className="report-form-card">
      <h2>Manage Reports</h2>
      <form onSubmit={handleSubmitReport}>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Report Type</option>
            <option value="presence">Presence</option>
            <option value="absence">Absence</option>
            <option value="leave">Leave</option>
            <option value="situation">Situation</option>
          </select>
        </div>
        <div>
          <label>Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Employee:</label>
          <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Receiver:</label>
          <select value={receiverId} onChange={(e) => setReceiverId(e.target.value)} required>
            <option value="">Select Receiver</option>
            {admin.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.name} (admin)
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <label>Sender:</label>
          <input
            type="text"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            placeholder="Sender ID"
            required
          />
        </div> */}
        <div>
          <label>Sender Role:</label>
          <select value={senderModel} onChange={(e) => setSenderModel(e.target.value)} required>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit">Submit Report</button>
      </form>
      </div>
      <div className="reports-list-card">
      <h3>All Reports</h3>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reports.length > 0 ? (
            reports.map((report) => (
              <li key={report._id} className="report-item">
                <div>
                  <strong>Type:</strong> {report.type}
                </div>
                <div>
                  <strong>Details:</strong> {report.details}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
                </div>
              </li>
            ))
          ) : (
            <li>No reports found</li>
          )}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ManageReports;




// // components/ManageReports.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { fetchReports } from '../../App/reportsSlice';

// const ManageReports = () => {
//   const dispatch = useDispatch();
//   const reports = useSelector((state) => state.reports.reports);
//   const reportsStatus = useSelector((state) => state.reports.status);
//   const token = localStorage.getItem('token');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [type, setType] = useState('');
//   const [details, setDetails] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [receiverId, setReceiverId] = useState('');
//   const [receiverModel, setReceiverModel] = useState('Admin');
//   const [senderModel, setSenderModel] = useState('Manager');
//   const [senderFilter, setSenderFilter] = useState('');
//   const [employeeFilter, setEmployeeFilter] = useState('');

//   useEffect(() => {
//     if (reportsStatus === 'idle') {
//       dispatch(fetchReports(token));
//     }
//   }, [reportsStatus, dispatch, token]);

//   useEffect(() => {
//     fetchEmployees();
//     fetchAdmins();
//   }, []);

//   useEffect(() => {
//     filterReports();
//   }, [senderFilter, employeeFilter, reports]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/admin/employeesprofile', {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/profile/profileAdmin', {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       setAdmin(response.data);
//     } catch (error) {
//       console.error('Error fetching admin:', error);
//     }
//   };

//   const handleSubmitReport = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         'http://localhost:3000/reports/submit',
//         {
//           type,
//           details,
//           employeeId,
//           receiverId,
//           receiverModel,
//           senderModel,
//         },
//         {
//           headers: {
//             'x-auth-token': token,
//           },
//         }
//       );
//       setType('');
//       setDetails('');
//       setEmployeeId('');
//       setReceiverId('');
//       setReceiverModel('Manager');
//       setSenderModel('Admin');
//       dispatch(fetchReports(token));
//     } catch (error) {
//       console.error('Error submitting report:', error);
//     }
//   };

//   const filterReports = () => {
//     let filtered = reports;

//     if (senderFilter) {
//       filtered = filtered.filter((report) =>
//         report.senderId && report.senderId.name.toLowerCase().includes(senderFilter.toLowerCase())
//       );
//     }

//     if (employeeFilter) {
//       filtered = filtered.filter((report) =>
//         report.employeeId && report.employeeId.name.toLowerCase().includes(employeeFilter.toLowerCase())
//       );
//     }

//     setFilteredReports(filtered);
//   };

//   return (
//     <div>
//       <h2>Manage Reports</h2>
//       <form onSubmit={handleSubmitReport}>
//         <div>
//           <label>Type:</label>
//           <select value={type} onChange={(e) => setType(e.target.value)} required>
//             <option value="">Select Report Type</option>
//             <option value="presence">Presence</option>
//             <option value="absence">Absence</option>
//             <option value="leave">Leave</option>
//             <option value="situation">Situation</option>
//           </select>
//         </div>
//         <div>
//           <label>Details:</label>
//           <textarea value={details} onChange={(e) => setDetails(e.target.value)} required />
//         </div>
//         <div>
//           <label>Employee:</label>
//           <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Receiver:</label>
//           <select value={receiverId} onChange={(e) => setReceiverId(e.target.value)} required>
//             <option value="">Select Receiver</option>
//             {admin.map((admin) => (
//               <option key={admin._id} value={admin._id}>
//                 {admin.name} (admin)
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Sender Role:</label>
//           <select value={senderModel} onChange={(e) => setSenderModel(e.target.value)} required>
//             <option value="Admin">Admin</option>
//             <option value="Manager">Manager</option>
//           </select>
//         </div>
//         <button type="submit">Submit Report</button>
//       </form>
//       <div>
//         <h3>Filter Reports</h3>
//         <div>
//           <label>Filter by Sender Name:</label>
//           <input
//             type="text"
//             placeholder="Sender Name"
//             value={senderFilter}
//             onChange={(e) => setSenderFilter(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Filter by Employee Name:</label>
//           <input
//             type="text"
//             placeholder="Employee Name"
//             value={employeeFilter}
//             onChange={(e) => setEmployeeFilter(e.target.value)}
//           />
//         </div>
//       </div>
//       <h3>All Reports</h3>
//       {reportsStatus === 'loading' ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {filteredReports.length > 0 ? (
//             filteredReports.map((report) => (
//               <li key={report._id}>
//                 <strong>Type:</strong> {report.type} - <strong>Details:</strong> {report.details} -{' '}
//                 <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
//               </li>
//             ))
//           ) : (
//             <p>No reports found</p>
//           )}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   export default ManageReports;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { fetchReports } from '../../App/reportsSlice';

// const ManageReports = () => {
//   const dispatch = useDispatch();
//   const reports = useSelector((state) => state.reports.reports);
//   const reportsStatus = useSelector((state) => state.reports.status);
//   const token = localStorage.getItem('token');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [type, setType] = useState('');
//   const [details, setDetails] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [receiverId, setReceiverId] = useState('');
//   const [receiverModel, setReceiverModel] = useState('Admin');
//   const [senderModel, setSenderModel] = useState('Manager');
//   const [senderFilter, setSenderFilter] = useState('');
//   const [employeeFilter, setEmployeeFilter] = useState('');

//   useEffect(() => {
//     if (reportsStatus === 'idle') {
//       dispatch(fetchReports(token));
//     }
//   }, [reportsStatus, dispatch, token]);

//   useEffect(() => {
//     fetchEmployees();
//     fetchAdmins();
//   }, []);

//   useEffect(() => {
//     filterReports();
//   }, [senderFilter, employeeFilter, reports]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/admin/employeesprofile', {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/profile/profileAdmin', {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       setAdmin(response.data);
//     } catch (error) {
//       console.error('Error fetching admin:', error);
//     }
//   };

//   const handleSubmitReport = async (e) => {
//     e.preventDefault();
//     console.log({
//       type,
//       details,
//       employeeId,
//       receiverId,
//       receiverModel,
//       senderModel,
//     });
//     try {
//       await axios.post(
//         'http://localhost:3000/reports/submit',
//         {
//           type,
//           details,
//           employeeId,
//           receiverId,
//           receiverModel,
//           senderModel,
//         },
//         {
//           headers: {
//             'x-auth-token': token,
//           },
//         }
//       );
//       setType('');
//       setDetails('');
//       setEmployeeId('');
//       setReceiverId('');
//       setReceiverModel('Manager');
//       setSenderModel('Admin');
//       dispatch(fetchReports(token));
//     } catch (error) {
//       console.error('Error submitting report:', error);
//     }
//   };

//   const filterReports = () => {
//     let filtered = reports;

//     if (senderFilter) {
//       filtered = filtered.filter((report) =>
//         report.senderId && report.senderId.name.toLowerCase().includes(senderFilter.toLowerCase())
//       );
//     }

//     if (employeeFilter) {
//       filtered = filtered.filter((report) =>
//         report.employeeId && report.employeeId.name.toLowerCase().includes(employeeFilter.toLowerCase())
//       );
//     }

//     setFilteredReports(filtered);
//   };

//   return (
//     <div>
//       <h2>Manage Reports</h2>
//       <form onSubmit={handleSubmitReport}>
//         <div>
//           <label>Type:</label>
//           <select value={type} onChange={(e) => setType(e.target.value)} required>
//             <option value="">Select Report Type</option>
//             <option value="presence">Presence</option>
//             <option value="absence">Absence</option>
//             <option value="leave">Leave</option>
//             <option value="situation">Situation</option>
//           </select>
//         </div>
//         <div>
//           <label>Details:</label>
//           <textarea value={details} onChange={(e) => setDetails(e.target.value)} required />
//         </div>
//         <div>
//           <label>Employee:</label>
//           <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Receiver:</label>
//           <select value={receiverId} onChange={(e) => setReceiverId(e.target.value)} required>
//             <option value="">Select Receiver</option>
//             {admin.map((admin) => (
//               <option key={admin._id} value={admin._id}>
//                 {admin.name} (admin)
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Sender Role:</label>
//           <select value={senderModel} onChange={(e) => setSenderModel(e.target.value)} required>
//             <option value="Admin">Admin</option>
//             <option value="Manager">Manager</option>
//           </select>
//         </div>
//         <button type="submit">Submit Report</button>
//       </form>
//       <div>
//         <h3>Filter Reports</h3>
//         <div>
//           <label>Filter by Sender Name:</label>
//           <input
//             type="text"
//             placeholder="Sender Name"
//             value={senderFilter}
//             onChange={(e) => setSenderFilter(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Filter by Employee Name:</label>
//           <input
//             type="text"
//             placeholder="Employee Name"
//             value={employeeFilter}
//             onChange={(e) => setEmployeeFilter(e.target.value)}
//           />
//         </div>
//       </div>
//       <h3>All Reports</h3>
//       {reportsStatus === 'loading' ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {filteredReports.length > 0 ? (
//             filteredReports.map((report) => (
//               <li key={report._id}>
//                 <strong>Type:</strong> {report.type} - <strong>Details:</strong> {report.details} -{' '}
//                 <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
//               </li>
//             ))
//           ) : (
//             <p>No reports found</p>
//           )}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   export default ManageReports;