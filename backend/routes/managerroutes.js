const express = require('express');
const router = express.Router();
const {getEmployeesUnderManager,getProfile ,getAllAdmins} = require ('../controllers/managercontrollers')
// const authMiddleware = require('../middleware/authMiddleware');
const authorizeManager = require('../middleware/authorizeManager')
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all the employees under the manager
router.get('/employeesM',authorizeManager, getEmployeesUnderManager);
//route to get manager credentials
router.get('/profile',authorizeManager, getProfile);
//get admin profile
router.get('/profileAdmin',authorizeManager, getAllAdmins);


module.exports = router;
