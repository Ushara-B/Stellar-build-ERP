const express = require("express");
const { addProduct } = require("../controllers/inventoryController");
const router = express.Router();


router.post("/addProduct", addProduct);


module.exports = router;