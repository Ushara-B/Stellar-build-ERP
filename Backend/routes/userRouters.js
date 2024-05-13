const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const UserController = require("../controllers/userControllers");


// Other user routes
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.login);

module.exports = router;