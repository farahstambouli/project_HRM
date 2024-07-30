//this is the admin controller where i put mostly the fonctions that will be done by an admin(HR)
//the fonctions where their is creation of employee account wherent used but can be used down the road for other interface but the functions are fonctional
// import every dependency we may need
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Manager = require('../models/Manager'); 
const Department = require('../models/Departments');
const Employee = require('../models/Employees');



//path to connect to .env file and jwt configuration
dotenv.config({ path: path.join(__dirname, '.env') });
const jwtSecret = process.env.JWT_SECRET;

//Register Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: 'Admin already exists' });
      }
      admin = new Admin({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
      res.status(201).json({ message: 'Admin account created successfully' });
      const payload = { admin: { id: admin.id } };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  //login an admin with the given password and email
  exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      // return res.status(400).json({ msg: 'Admin logged in' });
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const payload = { admin: { id: admin.id } };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  //get admin credentials
  exports.getAdmin = async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin.id).select('-password');
      res.json(admin);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
//add departments to the company
  exports.addDepartment = async (req, res) => {
    const { name, description} = req.body;
    try {
      const newDepartment = { name, description};
      const department = await Department.create(newDepartment);
      res.json(department);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  //get all department
  exports.getAllDepartments = async (req, res) => {
    try {
      const departments = await Department.find().sort({ name: 1 });
      res.json(departments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  //delete department
  exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        res.json({ msg: 'Department removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


  //add manager profile
  exports.addManager = async (req, res) => {
    const { name, email, password, department, salary } = req.body;
  
    // Validate department ObjectId
    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res.status(400).json({ msg: 'Invalid department ID' });
    }
  
    try {
      let manager = await Manager.findOne({ email });
      if (manager) {
        return res.status(400).json({ msg: 'Manager already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new manager
      manager = new Manager({
        name,
        email,
        password: hashedPassword,
        department,
        salary,
      });
  
      await manager.save();
      res.status(201).json({ message: 'Manager profile created successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
  };


  //login manager
  exports.loginManager = async (req, res) => {
    const { email, password } = req.body;
    try {
      let manager = await Manager.findOne({ email });
      if (!manager) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, manager.password);
      // return res.status(400).json({ msg: 'Admin logged in' });
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const payload = { manager: { id: manager.id } };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  //update manager
  exports.updateManager = async (req, res) => {
    const { name, job, department, salary } = req.body;
    try {
      let manager = await Manager.findById(req.params.id);
      if (!manager) {
        return res.status(404).json({ msg: 'Manager not found' });
      }
      manager.name = name || manager.name;
      manager.job = job || manager.job;
      manager.department = department || manager.department;
      manager.salary = salary || manager.salary;
      await manager.save();
      res.json(manager);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  
// Delete manager
exports.deleteManager = async (req, res) => {
  try {
    let manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ msg: 'Manager not found' });
    }
    await manager.deleteOne();
    res.json({ msg: 'Manager removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


//add employee 
exports.addEmployee = async (req, res) => {
  const { name, email, password, department, manager, salary } = req.body;

  // Validate department and manager ObjectId
  if (!mongoose.Types.ObjectId.isValid(department) || !mongoose.Types.ObjectId.isValid(manager)) {
    return res.status(400).json({ msg: 'Invalid department or manager ID' });
  }

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    // Ensure the department and manager exist
    const departmentExists = await Department.findById(department);
    const managerExists = await Manager.findById(manager);

    if (!departmentExists || !managerExists) {
      return res.status(400).json({ msg: 'Department or manager not found' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee
    employee = new Employee({
      name,
      email,
      password: hashedPassword,
      department,
      manager,
      salary
    });

    await employee.save();
    // Retrieve manager document again and update manager's team
    const managerToUpdate = await Manager.findById(manager);
    managerToUpdate.team.push(employee._id);
    await managerToUpdate.save();
    res.status(201).json({ message: 'Employee profile created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


//login employee
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    let employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    // return res.status(400).json({ msg: 'Admin logged in' });
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const payload = { employee: { id: employee.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
      
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


//update Employee
exports.updateEmployee = async (req, res) => {
  const { name, job, department, salary } = req.body;
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Manager not found' });
    }
    employee.name = name || employee.name;
    employee.job = job ||employee.job;
    employee.department = department || employee.department;
    employee.salary = salary || employee.salary;
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Delete employee
exports.deleteEmployee = async (req, res) => {
try {
  let employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ msg: 'Employee not found' });
  }
  await employee.deleteOne();
  res.json({ msg: 'Employee removed' });
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
};

//get all managers profile
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find().select('-password'); // Exclude the password
    res.json(managers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//get all employees profile
exports.getAllEmployees = async (req, res) => {
  try {
    console.log("Fetching all employees..."); // Add this line
    const employees = await Employee.find().select('-password'); // Exclude the password
    console.log("Employees:", employees); // Add this line
    res.json(employees);
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