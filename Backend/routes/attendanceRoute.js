const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendanceModel");
const attendanceController = require("../controllers/attendanceController")

router.get("/", attendanceController.getAttendance);
router.post("/", attendanceController.addAttendance);
router.get("/:id", attendanceController.getById);
router.get("/:id", attendanceController.getAttendanceByUid);


module.exports = router; 
