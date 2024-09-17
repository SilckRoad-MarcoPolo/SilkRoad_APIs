const Badge = require("../models/badgeModel");
const mainHandlers = require("./MAINHANDLERS");

/**
 * @desc    Get all badges
 * @route   GET /api/v1/badges
 * @access  Public
 */
exports.getBadges = mainHandlers.getAll(Badge);

/**
 * @desc    Get badge by ID
 * @route   GET /api/v1/badges/:id
 * @access  Public
 * @param   {String} id - Badge ID
 */
exports.getBadge = mainHandlers.getOne(Badge);

/**
 * @desc    Create badge
 * @route   POST /api/v1/badges
 * @access  Private/Admin
 */
exports.createBadge = mainHandlers.createOne(Badge);

/**
 * @desc    Update badge
 * @route   PATCH /api/v1/badges/:id
 * @access  Private/Admin
 * @param   {String} id - Badge ID
 */
exports.updateBadge = mainHandlers.updateOne(Badge);

/**
 * @desc    Delete badge
 * @route   DELETE /api/v1/badges/:id
 * @access  Private/Admin
 * @param   {String} id - Badge ID
 */
exports.deleteBadge = mainHandlers.deleteOne(Badge);