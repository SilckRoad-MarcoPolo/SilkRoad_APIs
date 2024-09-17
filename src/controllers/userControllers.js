const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { signToken } = require("../utils/createToken");
const mainHandlers = require("./MAINHANDLERS");

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
exports.getUsers = mainHandlers.getAll(User);

/**
 * @desc    Get user by ID
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 * @param   {String} id - User ID
 */
exports.getUser = mainHandlers.getOne(User);

/**
 * @desc    Create user
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
exports.createUser = mainHandlers.createOne(User);

/**
 * @desc    Update user
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 * @param   {String} id - User ID
 */
exports.updateUser = mainHandlers.updateOne(User);

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 * @param   {String} id - User ID
 */
exports.deleteUser = mainHandlers.deleteOne(User);

/**
 * @desc    Update Password
 * @route   PATCH /api/v1/auth/updatePassword
 * @access  Private/Logged User
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  // get user from collection
  const user = await User.findById(req.user._id).select("+password");
  // check if current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new ApiError("Your current password is wrong", 401));
  }
  // if so, update password
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // log user in, send JWT token
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    data: { user },
    token,
  });
});

// Helper function to filter out unwanted fields from req.body
const filterReqObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/**
 * @desc   Update Logged User Profile
 * @route  PATCH /api/v1/auth/updateProfile
 * @access Private/Logged User
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new ApiError(
        "This route is not for password updates. Please use /updatePassword",
        400
      )
    );
  }
  // update user document
  const filterObj = filterReqObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * @desc    Inactive User Account
 * @route   DELETE /api/v1/auth/inactiveAccount
 * @access  Private/Logged User
 */
exports.inactiveAccount = asyncHandler(async (req, res, next) => {
  // get user from collection
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    message: "Account is Inactive",
  });
});
