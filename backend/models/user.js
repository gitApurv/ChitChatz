const mogoose = require("mongoose");

const userSchema = new mogoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Favatar&psig=AOvVaw2lqWsY5frM1c-1EdUPo5s2&ust=1746302014166000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIC4r4zIhY0DFQAAAAAdAAAAABAE",
    },
  },
  {
    timestamps: true,
  }
);
const User = mogoose.model("User", userSchema);
module.exports = User;
