const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const projectrouter = require("./routes/projectRoute");
const userrouter = require("./routes/userRouters");
const vehiclerouter = require("./routes/VehicleRoutes");
const categoryrouter = require("./routes/categoryRoute");
const inventoryrouter = require("./routes/inventoryRoute");
const financerouter = require("./routes/transaction");
const leaveRouter = require("./routes/leaveRoute")
const attendanceRouter = require("./routes/attendanceRoute")
const  loanrouter = require("./routes/loanRoute");
const ClientRoute = require("./routes/ClientRoute.js");
const SupplierRoute = require("./routes/SupplierRoute.js");




const app = express();

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes

app.use("/users", userrouter);
app.use("/projects", projectrouter);
app.use("/vehicles", vehiclerouter);
app.use("/categories", categoryrouter);
app.use("/inventories", inventoryrouter);
app.use("/finance", financerouter);
app.use("/leaves", leaveRouter);
app.use("/attendance", attendanceRouter);
app.use("/Loan", loanrouter);

app.use('/clients', ClientRoute);
app.use('/suppliers', SupplierRoute);


 

//connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
