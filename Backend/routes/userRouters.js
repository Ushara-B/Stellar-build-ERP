const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const UserController = require("../controllers/userControllers");

// Login route
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // Find the user by user_N or email
    const user = await User.findOne({
      $or: [{ user_N: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches
    if (user.pswrd === password) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Other user routes
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;