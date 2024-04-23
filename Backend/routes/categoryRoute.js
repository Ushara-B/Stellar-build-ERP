const express = require("express");
const router = express.Router();

//insert model
const Category = require("../models/categoryModel");
//insert Category controller
const CategoryController = require("../controllers/categoryControllers"); 

router.get("/",CategoryController.getAllCategory);
router.post("/",CategoryController.addCategory);
router.get("/:id",CategoryController.getById);



//export 
module.exports = router;