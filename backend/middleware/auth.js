const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const response = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(response.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
};

module.exports = authMiddleware;
