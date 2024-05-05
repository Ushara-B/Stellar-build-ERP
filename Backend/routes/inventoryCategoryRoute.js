const express = require("express");
const router = express.Router();

//insert model
const ICategory = require("../models/inventoryCategoryModel");
//insert Category controller
const InventoryCategoryController = require("../controllers/inventoryCategoryController"); 

router.get("/",InventoryCategoryController.getAllICategory);
router.post("/",InventoryCategoryController.addICategory);
router.get("/:id",InventoryCategoryController.getById);
router.delete("/:id",InventoryCategoryController.deleteICategory);




//export 
module.exports = router;