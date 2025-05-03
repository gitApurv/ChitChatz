const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(process.env.PORT);
});
