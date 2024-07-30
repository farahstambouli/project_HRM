//schema for the manager
// models/Manager.js
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'manager',
    enum: ['manager'], // Ensures only "manager" is allowed
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
  salary: {
    type: Number,
    required: true,
  },
});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;
