const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.get("/api/chats", (req, res, next) => {
  res.json({
    message: "Hello from the server!",
    chats: [
      {
        id: 1,
        name: "John Doe",
        message: "Hello! How are you?",
      },
      {
        id: 2,
        name: "Jane Smith",
        message: "Hi! I'm good, thanks!",
      },
    ],
  });
});

app.listen(process.env.PORT);
