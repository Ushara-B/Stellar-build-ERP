const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let Users;
  //data dispaly--- //get all users
  try {
    Users = await User.find();
  } catch (err) {
    console.log(err);
  }
  //not found
  if (!Users) {
    return res.status(404).json({ message: "user not found" });
  }
  //display users
  return res.status(200).json({ Users });
};

//data insert--
const addUsers = async (req, res, next) => {
  const {
    user_N,
    f_Name,
    l_Name,
    dob,
    gender,
    age,
    m_Status,
    email,
    address,
    nic,
    role,
    pswrd,
    contact_No,
    f_contactNo,
    bank_D,
  } = req.body;
  let users;
  try {
    users = new User({
      user_N,
      f_Name,
      l_Name,
      dob,
      gender,
      age,
      m_Status,
      email,
      address,
      nic,
      role,
      pswrd,
      contact_No,
      f_contactNo,
      bank_D,
    });
    await users.save();
  } catch (err) {
    console.log(err);
  }
  //not insert users
  if (!users) {
    return res.status(404).json({ message: "unable to add users" });
  }
  return res.status(200).json({ users });
};

//get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  //not users not available
  if (!user) {
    return res.status(404).json({ message: "user not available" });
  }
  return res.status(200).json({ user });
};

//update user details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const {
    user_N,
    f_Name,
    l_Name,
    dob,
    gender,
    age,
    m_Status,
    email,
    address,
    nic,
    role,
    pswrd,
    contact_No,
    f_contactNo,
    bank_D,
  } = req.body;
  let users;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // If the password has been modified, hash the new password
    if (pswrd !== user.pswrd) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pswrd, salt);
      user.pswrd = hashedPassword;
    }

    // Update the user data
    user.user_N = user_N;
    user.f_Name = f_Name;
    user.l_Name = l_Name;
    user.dob = dob;
    user.gender = gender;
    user.age = age;
    user.m_Status = m_Status;
    user.email = email;
    user.address = address;
    user.nic = nic;
    user.role = role;
    user.contact_No = contact_No;
    user.f_contactNo = f_contactNo;
    user.bank_D = bank_D;

    users = await user.save();
  } catch (err) {
    console.log(err);
  }

  //not users not available
  if (!users) {
    return res.status(404).json({ message: "unable to update user" });
  }
  return res.status(200).json({ users });
};

//delete user details
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const {
    user_N,
    f_Name,
    l_Name,
    dob,
    gender,
    age,
    m_Status,
    email,
    address,
    nic,
    role,
    pswrd,
    contact_No,
    f_contactNo,
    bank_D,
  } = req.body;
  let userD;
  try {
    userD = await User.findByIdAndDelete(id, {
      user_N,
      f_Name,
      l_Name,
      dob,
      gender,
      age,
      m_Status,
      email,
      address,
      nic,
      role,
      pswrd,
      contact_No,
      f_contactNo,
      bank_D,
    });
    userD = await userD.save();
  } catch (err) {
    console.log(err);
  }
  //not users not available
  if (!userD) {
    return res.status(404).json({ message: "Cannot delete the user" });
  }
  return res.status(200).json({ userD });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;