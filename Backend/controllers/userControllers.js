const User = require("../models/userModel");
const { generateToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require('dotenv').config();
const nodemailer = require('nodemailer');

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
    const hashedPassword = await bcrypt.hash(pswrd, 10);

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
      pswrd: hashedPassword,
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
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

    if (pswrd && pswrd.trim() !== '') {
      const hashedPassword = await bcrypt.hash(pswrd, 10);
      user.pswrd = hashedPassword;
    }

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      from: 'stellarbuild.erp@outlook.com',
      subject: 'Password Reset',
      text: `You are receiving this because you  have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetLink}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error('There was an error: ', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        res.status(200).json({ message: 'Password reset link has been sent to your email.' });
      }
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.pswrd = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error in reset password:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
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
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
