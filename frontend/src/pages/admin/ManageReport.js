import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverModel, setReceiverModel] = useState('Manager');
  const [senderId, setSenderId] = useState('');
  const [senderModel, setSenderModel] = useState('Admin');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchReports();
    fetchEmployees();
    fetchManagers();
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

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/reports/submit', {
        type,
        details,
        employeeId,
        receiverId,
        receiverModel,
        senderId,
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
      setReceiverModel('Manager');
      setSenderId('');
      setSenderModel('Admin');
      fetchReports();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const handleFilterBySender = async (senderId) => {
    try {
      const response = await axios.get(`http://localhost:3000/report/manager/${senderId}`, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setReports(response.data);
    } catch (error) {
      console.error('Error filtering reports by sender:', error);
    }
  };

  const handleFilterByEmployee = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:3000/report/employee/${employeeId}`, {
        headers: {
          'x-auth-token': `${token}`
        }
      });
      setReports(response.data);
    } catch (error) {
      console.error('Error filtering reports by employee:', error);
    }
  };

  return (
    <div>
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
            {managers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name} (Manager)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sender:</label>
          <input
            type="text"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            placeholder="Sender ID"
            required
          />
        </div>
        <div>
          <label>Sender Role:</label>
          <select value={senderModel} onChange={(e) => setSenderModel(e.target.value)} required>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit">Submit Report</button>
      </form>
      <div>
        <h3>Filter Reports</h3>
        <div>
          <label>Filter by Sender:</label>
          <input
            type="text"
            placeholder="Sender ID"
            onChange={(e) => handleFilterBySender(e.target.value)}
          />
        </div>
        <div>
          <label>Filter by Employee:</label>
          <input
            type="text"
            placeholder="Employee ID"
            onChange={(e) => handleFilterByEmployee(e.target.value)}
          />
        </div>
      </div>
      <h3>All Reports</h3>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reports.length > 0 ? (
            reports.map((report) => (
              <li key={report._id}>
                <strong>Type:</strong> {report.type} - <strong>Details:</strong> {report.details} - <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li>No reports found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ManageReports;
