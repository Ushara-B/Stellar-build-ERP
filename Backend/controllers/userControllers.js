const User = require("../models/userModel");
const { generateToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let Users;
  try {
    Users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!Users) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ Users });
};

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

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(pswrd, 10);

    // Create a new user with the hashed password
    const users = new User({
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
      pswrd: hashedPassword, // Use the hashed password
      contact_No,
      f_contactNo,
      bank_D,
    });

    await users.save();

    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'Unable to add users' });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not available" });
  }
  return res.status(200).json({ user });
};

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

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
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

    // Check if the password needs to be updated
    if (pswrd && pswrd.trim() !== '') {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(pswrd, 10);
      user.pswrd = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Unable to update user' });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let userD;
  try {
    userD = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!userD) {
    return res.status(404).json({ message: "Cannot delete the user" });
  }
  return res.status(200).json({ userD });
};




const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log('Request Body:', req.body);
  try {
    const user = await User.findOne({
      $or: [{ user_N: usernameOrEmail }, { email: usernameOrEmail }],
    });
    console.log('Retrieved User:', user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.pswrd);
    console.log('Password Comparison Result:', isPasswordValid);
    console.log('Hashed Password:', user.pswrd);
    if (!isPasswordValid) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = generateToken(user);
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const logout = (req, res) => {
  // Clear the token from the client-side (e.g., remove from localStorage)
  res.status(200).json({ message: "Logout successful" });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = login;
exports.logout = logout;
exports.getUserProfile = getUserProfile;
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;  
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;  