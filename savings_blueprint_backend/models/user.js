const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      default: null,
    },

   provider: {
  type: String,
  enum: [
    "local",
    "google",
    "facebook",
  ],
  default: "local",
},

    googleId: {
      type: String,
      default: null,
    },

    facebookId: {
  type: String,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);