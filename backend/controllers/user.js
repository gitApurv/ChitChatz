const User = require("../models/user");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
  const { name, email, password, profilePicture } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userData = {
      name: name,
      email: email,
      password: passwordHash,
      ...(profilePicture && { profilePicture: profilePicture }),
    };

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User creation failed");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid password");
  }

  res.status(200).json({
    message: "User logged in successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    profilePicture: user.profilePicture,
    token: generateToken(user._id),
  });
};

module.exports.getAllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { regex: req.query.search, $options: "i" } },
          { email: { regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).json(users);
};
