
const Manager = require('../models/Manager');
const Employee = require('../models/Employees');
const Admin = require('../models/Admin');

// get all employees under a manager

exports.getEmployeesUnderManager = async (req, res) => {
  // try {
  //   const managerId = req.params.id;
    

  //   // Find the manager by ID and populate the team field with employee details
  //   const manager = await Manager.findById(managerId).populate('team');

  //   if (!manager) {
  //     return res.status(404).json({ msg: 'Manager not found' });
  //   }

  //   // Return the list of employees under this manager
  //   res.json(manager.team);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server error');
  // }
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

//get employee under manager with only the token
  // exports.getEmployeeUnderManager = async (req, res) => {
  //   try {
  //     const managerId = req.user.id; // Assuming your token payload includes the manager ID
  //     const employees = await Employee.find({ manager: managerId }); // Adjust the query to match your schema
  //     res.json(employees);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Server Error', error });
  //   }
  // };



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

