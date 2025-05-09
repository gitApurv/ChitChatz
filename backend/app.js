const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message: message,
  });
});

connectDB().then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT);
});
