const express = require("express");
const router = express.Router();

//insert model
const User = require("../models/userModel");
//insert user controller
const UserController = require("../controllers/userControllers"); 

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);


//export 
module.exports = router;