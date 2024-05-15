const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_N: { type: String, required: true, unique: true },
  f_Name: { type: String, required: true },
  l_Name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  m_Status: { type: String, required: true },
  nic: { type: String, required: true },
  role: { type: String, required: true },
  pswrd: { type: String, required: true },
  contact_No: { type: String, required: true },
  f_contactNo: { type: String, required: true },
  bank_D: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

module.exports = mongoose.model("userModel", userSchema);
