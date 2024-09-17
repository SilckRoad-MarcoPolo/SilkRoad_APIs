const Module = require("../models/moduleModel");
const mainHandlers = require("./MAINHANDLERS");

/**
 * @desc    Get all modules
 * @route   GET /api/v1/modules
 * @access  Public
 */
exports.getModules = mainHandlers.getAll(Module);

/**
 * @desc    Get module by ID
 * @route   GET /api/v1/modules/:id
 * @access  Public
 * @param   {String} id - Module ID
 */
exports.getModule = mainHandlers.getOne(Module);

/**
 * @desc    Create module
 * @route   POST /api/v1/modules
 * @access  Private/Admin
 */
exports.createModule = mainHandlers.createOne(Module);

/**
 * @desc    Update module
 * @route   PATCH /api/v1/modules/:id
 * @access  Private/Admin
 * @param   {String} id - Module ID
 */
exports.updateModule = mainHandlers.updateOne(Module);

/**
 * @desc    Delete module
 * @route   DELETE /api/v1/modules/:id
 * @access  Private/Admin
 * @param   {String} id - Module ID
 */
exports.deleteModule = mainHandlers.deleteOne(Module);
