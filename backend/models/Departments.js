//schema for the department
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  // Add more fields as per your requirements
});

Departement = mongoose.model('Departement',departmentSchema);

module.exports = Departement;
