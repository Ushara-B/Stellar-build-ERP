const express = require("express");
const router = express.Router();

//Insert Model
const Loan = require("../models/loanModel");


//Insert Loan Controller
const loanController = require("../controllers/loanController");


router.get("/", loanController.getAllLoans);
router.post("/", loanController.addLoan);
router.get("/:id", loanController.getById);
router.put("/:id", loanController.updateLoan);
router.delete("/:id",loanController.deleteLoan);//Delete
//export


//export
module.exports = router;