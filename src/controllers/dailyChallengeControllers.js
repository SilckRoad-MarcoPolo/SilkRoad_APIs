const DailyChallenge = require('../models/dailyChallengeModel');
const mainHandlers = require('./MAINHANDLERS');

/**
 * @desc    Get all daily challenges
 * @route   GET /api/v1/dailyChallenges
 * @access  Public
 */
exports.getDailyChallenges = mainHandlers.getAll(DailyChallenge);

/**
 * @desc    Get daily challenge by ID
 * @route   GET /api/v1/dailyChallenges/:id
 * @access  Public
 * @param   {String} id - Daily Challenge ID
 */
exports.getDailyChallenge = mainHandlers.getOne(DailyChallenge);

/**
 * @desc    Create daily challenge
 * @route   POST /api/v1/dailyChallenges
 * @access  Private/Admin
 */
exports.createDailyChallenge = mainHandlers.createOne(DailyChallenge);

/**
 * @desc    Update daily challenge
 * @route   PATCH /api/v1/dailyChallenges/:id
 * @access  Private/Admin
 * @param   {String} id - Daily Challenge ID
 */
exports.updateDailyChallenge = mainHandlers.updateOne(DailyChallenge);

/**
 * @desc    Delete daily challenge
 * @route   DELETE /api/v1/dailyChallenges/:id
 * @access  Private/Admin
 * @param   {String} id - Daily Challenge ID
 */
exports.deleteDailyChallenge = mainHandlers.deleteOne(DailyChallenge);