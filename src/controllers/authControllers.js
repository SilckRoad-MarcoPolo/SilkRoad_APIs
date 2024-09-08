const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("express-async-handler");
const passwordResetTemplate = require("../utils/emailTemplate");
const { signToken } = require("../utils/createToken");
const AppError = require("../utils/apiError");
const util = require("util");
const crypto = require("crypto");

/**
 * @desc    Signup a new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
    token,
  });
});

/**
 * @desc    Login a user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist in the request body
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // If everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: { user },
    token,
  });
});

/**
 * @desc    Protect routes
 */
exports.protect = asyncHandler(async (req, res, next) => {
  // read token from header & check if it exists
  const testToken = req.headers.authorization;

  let token;

  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }
  // validate token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // if token is valid, check if user still exists
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // check if user changed password after the token was issued
  const isPasswordChanged = await currentUser.changedPasswordAfter(
    decodedToken.iat
  );
  if (isPasswordChanged) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }
  // allow access to protected route
  req.user = currentUser;
  next();
});

/**
 * @desc    Restrict routes to specific roles
 */
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgotPassword
 * @access  Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  //if user exist, generate reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  // hash the code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // save hashed code to db
  user.passwordResetCode = hashedResetCode;
  // expire time => 10 min
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save({ validateBeforeSave: false });

  // Generate the email content using the template
  const htmlMessage = passwordResetTemplate(user, resetCode);

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (Valid for 10 min)",
      // message: htmlMessage,
      html: htmlMessage,
    });
  } catch (er) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    // Save without triggering validation
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There is an Error in sending Email", 500));
  }

  res.status(200).json({
    status: "success",
    message: `Reset Code Sent to this Email: ${user.email}`,
  });
});

/**
 * @desc    Verify Password Code
 * @route   POST /api/v1/auth/verifyPasswordCode
 * @access  Public
 */
exports.verifyPasswordCode = asyncHandler(async (req, res, next) => {
  // get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Reset Code Invalid or Expired"));
  }
  // reset code valid
  user.passwordResetVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Reset Code is Verified",
  });
});

/**
 * @desc    Reset Password
 * @route   POST /api/v1/auth/resetPassword
 * @access  Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`There is no user with email ${req.body.email}`, 400)
    );
  }
  // check if reset code is verifed
  if (!user.passwordResetVerified) {
    return next(new AppError(`Reset code not verifed`, 404));
  }

  user.password = req.body.newPassword;

  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save({ validateBeforeSave: false });

  // generate new token ater all is ok
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password reset Successfully",
    token: token,
  });
});
