const Appointment = require("../models/appointmentModel");
const mainHandlers = require("./mainHandlers");

/**
 * @desc    Get all appointments
 * @route   GET /api/v1/appointments
 * @access  Private/Mentor
 */
exports.getAppointments = mainHandlers.getAll(Appointment);

/**
 * @desc    Get appointment by ID
 * @route   GET /api/v1/appointments/:id
 * @access  Private/Mentor
 * @param   {String} id - Appointment ID
 */
exports.getAppointment = mainHandlers.getOne(Appointment);

/**
 * @desc    Create appointment
 * @route   POST /api/v1/appointments
 * @access  Private/Mentor
 */
exports.createAppointment = mainHandlers.createOne(Appointment);

/**
 * @desc    Update appointment
 * @route   PATCH /api/v1/appointments/:id
 * @access  Private/Mentor
 * @param   {String} id - Appointment ID
 */
exports.updateAppointment = mainHandlers.updateOne(Appointment);

/**
 * @desc    Delete appointment
 * @route   DELETE /api/v1/appointments/:id
 * @access  Private/Mentor
 * @param   {String} id - Appointment ID
 */
exports.deleteAppointment = mainHandlers.deleteOne(Appointment);
