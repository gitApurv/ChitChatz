const Chat = require("../models/chat");
const User = require("../models/user");

// Get all chats
module.exports.getAllChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const result = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email profilePicture",
    });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

// Get a chat
module.exports.accessChat = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email profilePicture",
    });

    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    if (!req.body.users || !req.body.title) {
      res.status(400);
      throw new Error("Fill all feilds");
    }

    const users = JSON.parse(req.body.users);

    if (users.length < 2) {
      res.status(400);
      throw new Error("More than 2 users are required to form a group chat");
    }

    users.push(req.user._id);

    const groupChat = await Chat.create({
      chatName: req.body.title,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user._id,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    next(err);
  }
};

module.exports.renameGroup = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat not found");
    } else {
      res.status(200).json(updatedChat);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.addToGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404);
      throw new Error("Chat not found");
    } else {
      res.status(200).json(added);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.removeFromGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404);
      throw new Error("Chat not found");
    } else {
      res.status(200).json(removed);
    }
  } catch (err) {
    next(err);
  }
};
