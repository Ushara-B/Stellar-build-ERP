const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;
