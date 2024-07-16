const express = require('express');
const router = express.Router();
const {getEmployeesUnderManager} = require ('../controllers/managercontrollers')
// const authMiddleware = require('../middleware/authMiddleware');

// Route to get all the employees under the manager
router.get('/:id/employees', getEmployeesUnderManager);


module.exports = router;
