
const Manager = require('../models/Manager');
const Employee = require('../models/Employees');

// get all employees under a manager
exports.getEmployeesUnderManager = async (req, res) => {
  try {
    const managerId = req.params.id;

    // Find the manager by ID and populate the team field with employee details
    const manager = await Manager.findById(managerId).populate('team');

    if (!manager) {
      return res.status(404).json({ msg: 'Manager not found' });
    }

    // Return the list of employees under this manager
    res.json(manager.team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};