const express = require('express');
const router = express.Router();
const { addDepartment, getAllDepartments,deleteDepartment } = require('../controllers/admincontrollers');

// Route to add a department
router.post('/add', addDepartment);

// Route to get all departments
router.get('/allDeparts', getAllDepartments);
// route to delete department

router.delete('/delete/:id', deleteDepartment);


module.exports = router;
