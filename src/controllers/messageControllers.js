const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const ApiError = require("../utils/apiError");

/**
 * @desc Send a message
 * @route POST /api/messages
 * @access Private/Logged in users
 */
exports.sendMessage = asyncHandler(async (req, res) => {
  const { channelId, text } = req.body;
  const message = await Message.create({
    channel: channelId,
    sender: req.user._id,
    text,
  });
  res.status(201).json({
    message: "Message sent successfully",
    message,
  });
});

/**
 * @desc Get all messages in a channel
 * @route GET /api/messages/:channelId
 * @access Private/Logged in users
 */
exports.getMessages = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const messages = await Message.find({ channel: channelId }).populate(
    "sender",
    "name"
  );

  if (!messages) {
    throw new ApiError("No messages found", 404);
  }

  res.json({
    message: "Messages fetched successfully",
    messages,
  });
});
