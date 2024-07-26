const express = require('express');
const router = express.Router();
const {getEmployeesUnderManager,getProfile} = require ('../controllers/managercontrollers')
// const authMiddleware = require('../middleware/authMiddleware');
const authorizeManager = require('../middleware/authorizeManager')
// const authMiddleware = require('../middleware/authMiddleware');

// Route to get all the employees under the manager
router.get('/:id/employees', getEmployeesUnderManager);
//route to get manager credentials
router.get('/profile',authorizeManager, getProfile);


module.exports = router;
