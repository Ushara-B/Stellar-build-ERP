const express = require("express")
const cors = require("cors");
const {readdirSync} = require('fs');
const app = express();

const dotenv =require("dotenv").config();
const mongoose =require("mongoose");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


//connect to DB and start server
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
 app.listen(PORT, () => {
   console.log(`Server Running on port ${PORT}`);
 });
})
.catch((err) => console.log(err));