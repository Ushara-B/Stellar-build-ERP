const express = require("express")
const cors = require("cors");
const {readdirSync} = require('fs');
const app = express();

const dotenv =require("dotenv").config();
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const Inventory = require("./models/InventoryModel");
const errorHandler = require("./middleWare/errorMiddleware")

const inventoryRoute = require("./routes/inventoryRoute")

const PORT = process.env.PORT || 5000;

//Routes middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


app.use("/api/inventory", inventoryRoute);


//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get("/", (req, res) => {
    res.send("Home Page");
  });


//Error Middleware
app.use(errorHandler)


//connect to DB and start server
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
 app.listen(PORT, () => {
   console.log(`Server Running on port ${PORT}`);
 });
})
.catch((err) => console.log(err));