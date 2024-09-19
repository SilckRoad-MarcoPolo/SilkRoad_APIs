const asyncHandler = require("express-async-handler");
const Channel = require("../models/channelModel");
const ApiError = require("../utils/apiError");

/**
 * @desc Create a channel
 * @route POST /api/channels
 * @access Private/Admin
 */
exports.createChannel = asyncHandler(async (req, res) => {
  const { name, members } = req.body;
  const channel = await Channel.create({ name, members });

  res.status(201).json({
    message: "Channel created successfully",
    channel,
  });
});

/**
 * @desc Get all channels
 * @route GET /api/channels
 * @access Private/Admin
 */
exports.getChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find({ members: req.user._id });

    if (!channels) {
    throw new ApiError("No channels found", 404);
    }

  res.json({
    message: "Channels fetched successfully",
    channels,
  });
});
