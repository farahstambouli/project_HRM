//this is the manager controller
///for now: he can view the employee under him and view his profile
//can add more fonctionalities down the road
const Manager = require('../models/Manager');
const Employee = require('../models/Employees');
const Admin = require('../models/Admin');

// get all employees under a manager
exports.getEmployeesUnderManager = async (req, res) => {
 
  try {
    // Access manager ID from the request object
    const managerId = req.manager.id;

    // Find the manager and populate their team
    const managerDoc = await Manager.findById(managerId).populate('team');

    if (!managerDoc) {
        return res.status(404).json({ message: 'Manager not found' });
    }

    res.json(managerDoc.team); // Return the populated team
} catch (error) {
    res.status(500).json({ message: error.message });
}
};


//get manager profile
exports.getProfile = async (req, res) => {
  try {
    const manager = await Manager.findById(req.manager.id).select('-password');
    res.json(manager);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//get all admin users profile

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Exclude the password
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

