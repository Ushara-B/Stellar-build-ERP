const express = require("express");
const router = express.Router();
//Insert Model
const Vehicle = require("../models/VehicleModel");
//Insert Vehicle Controller
const VehicleController = require("../controllers/VehicleControllers");

router.get("/",VehicleController.getAllVehicles);//display
router.post("/",VehicleController.addVehicles);//insert
router.get("/:id",VehicleController.getById);
router.put("/:id",VehicleController.updateVehicle);//Update
router.delete("/:id",VehicleController.deleteVehicle);//Delete
//export
module.exports = router;

