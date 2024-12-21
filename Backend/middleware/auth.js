const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      user_N: user.user_N,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };