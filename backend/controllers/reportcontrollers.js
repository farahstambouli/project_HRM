const Report = require('../models/Report');

//: Allows a manager or an admin to submit a report about an employee or a situation.
//submit the report
exports.submitReport = async (req, res) => {
    const { type, details, employeeId, receiverId, receiverModel, senderId, senderModel } = req.body;

    // Validate sender model
    if (!['Manager', 'Admin'].includes(senderModel)) {
      return res.status(400).json({ msg: 'Invalid sender model' });
    }
    
    try {
      const newReport = new Report({
        senderId: senderId || req.user.id, // Use provided senderId or fall back to req.user.id
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

  //Allows an admin to retrieve all reports in the system.
  exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

  //Allows an admin to retrieve all reports submitted by a specific manager.
  exports.getReportsByManager = async (req, res) => {
    try {
        const { managerId } = req.params;
        const reports = await Report.find({ senderId: managerId, senderModel: 'Manager' });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
  //Allows a manager or an admin to retrieve all reports related to a specific employee.
  exports.getReportsByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const reports = await Report.find({ employeeId });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
  //Allows a manager or an admin to retrieve all reports they have received.
  exports.getReceivedReports = async (req, res) => {
    try {
        const reports = await Report.find({ receiverId: req.user.id, receiverModel: req.user.role });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};