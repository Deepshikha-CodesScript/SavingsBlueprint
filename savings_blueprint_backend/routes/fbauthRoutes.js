const express = require("express");
const axios = require("axios");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
router.post(
  "/facebook",
  async (req, res) => {
    try {
      const { accessToken } =
        req.body;

      const fbResponse =
        await axios.get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
        );

      const {id,name,email,} = fbResponse.data;

      let user =
        await User.findOne({
          email,
        });

    if (!user) {
  user = await User.create({
    name,
    email,
    provider: "facebook",
    facebookId: id,
  });
} else {
  if (!user.facebookId) {
    user.facebookId = id;
  }

  if (
    user.provider !==
    "facebook"
  ) {
    user.provider =
      "facebook";
  }

  await user.save();
}

      const token =
        jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        token,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Facebook login failed",
      });
    }
  }
);

module.exports = router;