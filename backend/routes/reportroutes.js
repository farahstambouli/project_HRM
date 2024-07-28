const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {submitReport,getAllReports ,getReportsByManager,getReportsByEmployee,getReportsByEmployeeName} = require('../controllers/reportcontrollers');

// Route to submit a report

router.post('/submit', authMiddleware, submitReport );

//routes to get all reports

router.get('/allreports', authMiddleware, getAllReports );

//routes to retrieve reports from a manager

router.get('/manager/:id', authMiddleware, getReportsByManager);

//route to get reports by employee

router.get('/employee/:id', getReportsByEmployee);

// Add these routes to your router
// router.get('/reports/manager', getReportsBySenderName);
// router.get('/reports/by-employee', getReportsByEmployeeName);



  module.exports = router;

module.exports = router;

