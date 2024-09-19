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
const {
  createChannelValidators,
  sendMessageValidators,
} = require("../validators/chatValidator");

router.post("/channels", protect, createChannelValidators, createChannel);
router.get("/channels", protect, getChannels);

router.post("/messages", protect, sendMessageValidators, sendMessage);
router.get("/messages/:channelId", protect, getMessages);

module.exports = router;
