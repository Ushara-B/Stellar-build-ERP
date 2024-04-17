const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  emp_id: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  date: {
    type: String,
    required: true,
  },
  clock_in: {
    type: String,
    required: true,
  },
  clock_out: {
    type: String,
    
  },
});

module.exports = mongoose.model('attendanceModel', attendanceSchema);
