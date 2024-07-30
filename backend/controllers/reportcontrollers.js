//: Allows a manager or an admin to submit a report about an employee or a situation.
//i did it in another file as it seems wastful to do the report part for each admin and manager
//it made more sense to do a fonction where the report depend on the sender or the receiver 
const Report = require('../models/Report');


//submit the report
exports.submitReport = async (req, res) => {
    const { type, details, employeeId, receiverId, receiverModel, senderId, senderModel } = req.body;

    // Validate sender model
    if (!['Manager', 'Admin'].includes(senderModel)) {
      return res.status(400).json({ msg: 'Invalid sender model' });
    }
    
    try {
      const newReport = new Report({
        // senderId: senderId || req.user.id, // Use provided senderId or fall back to req.user.id
        senderModel: senderModel || req.user.role, // Use provided senderModel or fall back to req.user.role
        receiverId,
        receiverModel,
        type,
        details,
        employeeId
      });
    
      await newReport.save();
      res.status(201).json({ message: 'Report submitted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
// Retrieve all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('employeeId', 'name');
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


//this filter fonction needs to be reviewed to be fonctional in the future 
// // Filter reports by sender name
// exports.getReportsBySenderName = async (req, res) => {
//   try {
//     const senderName = req.query.name;
//     const reports = await Report.find().populate({
//       path: 'senderId',
//       match: { name: senderName }
//     });
//     res.json(reports.filter(report => report.senderId !== null));
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Filter reports by employee name
// exports.getReportsByEmployeeName = async (req, res) => {
//   try {
//     const employeeName = req.query.name;
//     const reports = await Report.find().populate({
//       path: 'employeeId',
//       match: { name: employeeName }
//     });
//     res.json(reports.filter(report => report.employeeId !== null));
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };





// Retrieve reports by manager
// exports.getReportsByManager = async (req, res) => {
//   try {
//     const { managerId } = req.params;
//     const reports = await Report.find({ senderId: managerId, senderModel: 'Manager' }).populate('employeeId', 'name');
//     res.json(reports);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.getReportsByManager = async (req, res) => {
  try {
    const { managerId } = req.params;
    console.log('Request params:', req.params);
    console.log(`Fetching reports for managerId: ${managerId}`);
    
    const reports = await Report.find({ senderId: managerId, senderModel: 'Manager' }).populate('employeeId', 'name');
    
    console.log('Reports found:', reports);
    res.json(reports);
  } catch (err) {
    console.error('Error fetching reports by manager:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getReportsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log('Request params:', req.params);
    console.log(`Fetching reports for employeeId: ${employeeId}`);
    
    const reports = await Report.find({ employeeId }).populate('employeeId', 'name');
    
    console.log('Reports found:', reports);
    res.json(reports);
  } catch (err) {
    console.error('Error fetching reports by employee:', err.message);
    res.status(500).send('Server error');
  }
};


// Retrieve reports received by the logged-in user
exports.getReceivedReports = async (req, res) => {
  try {
    const reports = await Report.find({ receiverId: req.user.id, receiverModel: req.user.role }).populate('senderId', 'name');
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



//this commented functions need to be reviewed dependincg on the preferred situations

//   //Allows an admin to retrieve all reports in the system.
//   exports.getAllReports = async (req, res) => {
//     try {
//         const reports = await Report.find();
//         res.json(reports);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

  //Allows an admin to retrieve all reports submitted by a specific manager.
//   exports.getReportsByManager = async (req, res) => {
//     try {
//         const { managerId } = req.params;
//         const reports = await Report.find({ senderId: managerId, senderModel: 'Manager' });
//         res.json(reports);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };
//   //Allows a manager or an admin to retrieve all reports related to a specific employee.
//   exports.getReportsByEmployee = async (req, res) => {
//     try {
//         const { employeeId } = req.params;
//         const reports = await Report.find({ employeeId });
//         res.json(reports);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };
//   //Allows a manager or an admin to retrieve all reports they have received.
//   exports.getReceivedReports = async (req, res) => {
//     try {
//         const reports = await Report.find({ receiverId: req.user.id, receiverModel: req.user.role });
//         res.json(reports);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };