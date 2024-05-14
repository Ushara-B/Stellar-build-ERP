const express = require("express");
const router = express.Router();

//insert model
const Inventory = require("../models/InventoryModel");
//insert Inventory controller
const InventoryController = require("../controllers/inventoryControllers"); 

router.get("/",InventoryController.getAllInventory);
router.post("/",InventoryController.addInventory);
router.get("/:id",InventoryController.getById);
router.put("/:id",InventoryController.updateInventory);
router.delete("/:id",InventoryController.deleteInventory);


//export 
module.exports = router;