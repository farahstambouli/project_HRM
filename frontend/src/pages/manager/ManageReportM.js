//this is the part for manager to manage reports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ManageReportsM.css'

const ManageReports = () => {
  // set the states for the components 
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

  //fonction to fetch the reports from the database
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


  //fonction to fetch the employees from the database
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

  //fonction to fetch the admins from the database
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

  //fonction to handle the change of the report type
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


  //  this part of the code is the jsx part
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

