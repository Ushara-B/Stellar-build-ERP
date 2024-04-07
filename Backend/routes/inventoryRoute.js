const express = require("express");
const router = express.Router();
const Inventory = require("../models/InventoryModel");
const inventoryController = require("../controllers/inventoryController");
    //addProduct,
    











router.get("/",inventoryController.getAllInventory);
router.post("/",inventoryController.addProduct);
router.get("/:id",inventoryController.getById);
router.put("/:id",inventoryController.updateInventory);
router.delete("/:id",inventoryController.deleteInventory);



module.exports = router;