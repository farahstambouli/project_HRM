const express = require('express');
const router = express.Router();
const {registerAdmin , loginAdmin,getAdmin,addManager,addDepartment,getAllDepartments,loginManager,updateManager ,deleteManager,addEmployee,loginEmployee,updateEmployee,deleteEmployee,getAllManagers,getAllEmployees} = require('../controllers/admincontrollers');
const authMiddleware = require('../middleware/authMiddleware');

//routes for the admin
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/currentAdmin', authMiddleware ,getAdmin);
// //add department
// router.post('/add', addDepartment);
// router.get('/allDeparts', getAllDepartments)
//routes for the manager
router.post('/registermanager', addManager);
router.post('/loginmanager', loginManager);
router.put('/updatemanager/:id',updateManager);
router.delete('/deletemanager/:id',deleteManager);
//routes for the employee
router.post('/registeremployee', addEmployee);
router.post('/loginemployee', loginEmployee);
router.put('/updateemployee/:id',updateEmployee);
router.delete('/deleteemployee/:id',deleteEmployee);
//routes for profiles
router.get('/managersprofile',authMiddleware,getAllManagers)
router.get('/employeesprofile',authMiddleware,getAllEmployees)






module.exports = router;