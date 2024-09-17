const Mentor = require("../models/mentorModel");
const mainHandlers = require("./MAINHANDLERS");

/**
 * @desc    Get all mentors
 * @route   GET /api/v1/mentors
 * @access  Private/Admin
 */
exports.getMentors = mainHandlers.getAll(Mentor);

/**
 * @desc    Get mentor by ID
 * @route   GET /api/v1/mentors/:id
 * @access  Private/Admin
 * @param   {String} id - Mentor ID
 */
exports.getMentor = mainHandlers.getOne(Mentor);

/**
 * @desc    Create mentor
 * @route   POST /api/v1/mentors
 * @access  Private/Admin
 */
exports.createMentor = mainHandlers.createOne(Mentor);

/**
 * @desc    Update mentor
 * @route   PATCH /api/v1/mentors/:id
 * @access  Private/Admin
 * @param   {String} id - Mentor ID
 */
exports.updateMentor = mainHandlers.updateOne(Mentor);

/**
 * @desc    Delete mentor
 * @route   DELETE /api/v1/mentors/:id
 * @access  Private/Admin
 * @param   {String} id - Mentor ID
 */
exports.deleteMentor = mainHandlers.deleteOne(Mentor);
