// password =7mjSvDkPkebyersQ

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Backend/routes/loanRoute");

const app = express();

//Middleware
app.use(express.json());
app.use("/Loan", router);



mongoose.connect("mongodb+srv://Avishka:7mjSvDkPkebyersQ@atlascluster.ylwdopx.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));


/// Data Base caonnection eka heduwaaaa




