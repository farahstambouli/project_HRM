//schema for the report
// models/Report.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  // senderId: {
  //   type: Schema.Types.ObjectId,
  //   refPath: 'senderModel',
  //   required: true,
  // },
  senderModel: {
    type: String,
    required: true,
    enum: ['Manager', 'Admin'],
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['Manager', 'Admin'],
  },
  type: {
    type: String,
    required: true,
    enum: ['presence', 'absence', 'leave', 'situation'], // Add other types if needed
  },
  details: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);

