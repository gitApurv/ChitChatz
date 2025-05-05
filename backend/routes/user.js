const express = require("express");

const userController = require("../controllers/user");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// api/user/
router.get("/", authMiddleware, userController.getAllUsers);

// api/user/signup
router.post("/signup", userController.registerUser);

// api/user/login
router.post("/login", userController.loginUser);

module.exports = router;
