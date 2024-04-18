const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  uId:{
    type:String,
    required: true,
  },
 
  emp_id: {
    type: String,
    required: true,
    trim: true,
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
