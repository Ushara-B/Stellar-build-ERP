const express = require("express");
const router = express.Router();
const Leave = require("../models/LeaveModel");
const leaveController = require("../controllers/leaveController")

router.get("/", leaveController.getLeave);
router.post("/", leaveController.addLeave);
router.get("/:id", leaveController.getById);
router.put("/:id", leaveController.updateLeave);
router.delete("/:id", leaveController.deleteLeave);

module.exports = router;    