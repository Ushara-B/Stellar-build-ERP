const express = require("express");
const supplierRouter = express.Router();
const SupplierController = require("../Controllers/SupplierControler");

supplierRouter.get("/", SupplierController.getAllSuppliers);
supplierRouter.post("/", SupplierController.addSupplier);
supplierRouter.get("/:id", SupplierController.getSupplierById);
supplierRouter.put("/:id", SupplierController.updateSupplier);
supplierRouter.delete("/:id", SupplierController.deleteSupplier);

module.exports = supplierRouter;
