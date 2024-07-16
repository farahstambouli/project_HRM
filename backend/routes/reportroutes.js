const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {submitReport} = require('../controllers/reportcontrollers');

// Route to submit a report

router.post('/submit', authMiddleware, submitReport );

module.exports = router;

