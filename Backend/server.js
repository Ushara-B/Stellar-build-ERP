const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const userrouter = require("./routes/userRouters");

const app = express();

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userrouter);
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

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
