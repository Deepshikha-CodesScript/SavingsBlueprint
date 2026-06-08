 const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket =
      await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

    const payload = ticket.getPayload();

    console.log(payload);

    res.json({
      success: true,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Invalid Google Token",
    });
  }
});

module.exports = router;