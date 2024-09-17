const XpAndStreaks = require("../models/xpAndStreaksModel");
const mainHandler = require("./MAINHANDLERS");

/**
 * @desc    Get all xpAndStreaks
 * @route   GET /api/v1/xp-and-streaks
 * @access  Private/Admin
 */
exports.getXpAndStreaks = mainHandler.getAll(XpAndStreaks);

/**
 * @desc    Create xpAndStreak
 * @route   POST /api/v1/xp-and-streaks
 * @access  Private/Admin
 */
exports.createXpAndStreak = mainHandler.createOne(XpAndStreaks);

/**
 * @desc    Get xpAndStreak
 * @route   GET /api/v1/xp-and-streaks/:id
 * @access  Private/Admin
 */
exports.getXpAndStreak = mainHandler.getOne(XpAndStreaks);

/**
 * @desc    Update xpAndStreak
 * @route   PATCH /api/v1/xp-and-streaks/:id
 * @access  Private/Admin
 */
exports.updateXpAndStreak = mainHandler.updateOne(XpAndStreaks);

/**
 * @desc    Delete xpAndStreak
 * @route   DELETE /api/v1/xp-and-streaks/:id
 * @access  Private/Admin
 */
exports.deleteXpAndStreak = mainHandler.deleteOne(XpAndStreaks);
