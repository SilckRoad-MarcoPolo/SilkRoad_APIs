const express = require("express");
const router = express.Router();
const {
  createChannel,
  getChannels,
} = require("../controllers/channelControllers");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../controllers/authControllers");

router.post("/channels", protect, createChannel);
router.get("/channels", protect, getChannels);

router.post("/messages", protect, sendMessage);
router.get("/messages/:channelId", protect, getMessages);

module.exports = router;
