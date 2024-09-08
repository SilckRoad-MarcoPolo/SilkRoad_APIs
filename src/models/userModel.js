const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid email",
      ],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Encrypt password before saving
user.pre("save", async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove confirmPassword field after validation
  this.confirmPassword = undefined;
  next();
});

// Compare password with hashed password
user.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if user changed password after the token was issued
user.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Get Active Users Only
user.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("User", user);
