const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const chatController = require("../controllers/chat");

// api/chat/
router.get("/", authMiddleware, chatController.getAllChats);

// api/chat/access-chat
router.post("/access-chat", authMiddleware, chatController.accessChat);

// api/chat/create-group
router.post("/create-group", authMiddleware, chatController.createGroup);

// api/chat/rename-group
router.put("/rename-group", authMiddleware, chatController.renameGroup);

// api/chat/add-to-group
router.put("/add-to-group", authMiddleware, chatController.addToGroup);

// api/chat/remove-from-group
router.put(
  "/remove-from-group",
  authMiddleware,
  chatController.removeFromGroup
);

module.exports = router;
