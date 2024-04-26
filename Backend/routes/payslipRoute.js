const express = require("express");
const router = express.Router();
const payslip = require("../models/payslipModel");
const paysilpController = require("../controllers/paslipController");

router.get("/", paysilpController.getPayslip);
router.post("/", paysilpController.addPayslip);
router.get("/:id", paysilpController.getById);

module.exports = router;