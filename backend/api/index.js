require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

 
app.use(cors());
app.use(express.json());
 
app.use("/api", require("../routes/productRoutes"));

app.get("/", (req, res) => {
  res.status(200).send("WORKING");
});

module.exports = serverless(app);