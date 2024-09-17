const Track = require("../models/trackModel");
const mainHandlers = require("./MAINHANDLERS");

/**
 * @desc    Get all tracks
 * @route   GET /api/v1/tracks
 * @access  Public
 */
exports.getTracks = mainHandlers.getAll(Track, ['track_name', 'description']);

/**
 * @desc    Get track by ID
 * @route   GET /api/v1/tracks/:id
 * @access  Public
 * @param   {String} id - Track ID
 */
exports.getTrack = mainHandlers.getOne(Track);

/**
 * @desc    Create track
 * @route   POST /api/v1/tracks
 * @access  Private/Admin
 */
exports.createTrack = mainHandlers.createOne(Track);

/**
 * @desc    Update track
 * @route   PATCH /api/v1/tracks/:id
 * @access  Private/Admin
 * @param   {String} id - Track ID
 */
exports.updateTrack = mainHandlers.updateOne(Track);

/**
 * @desc    Delete track
 * @route   DELETE /api/v1/tracks/:id
 * @access  Private/Admin
 * @param   {String} id - Track ID
 */
exports.deleteTrack = mainHandlers.deleteOne(Track);
