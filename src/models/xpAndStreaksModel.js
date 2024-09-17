const mongoose = require("mongoose");

const xpAndStreaksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  xp_points: {
    type: Number,
    required: [true, "XP points is required"],
  },
  streak_days: {
    type: Number,
    default: 0,
  },
  streak_multiplier: {
    type: Number,
    default: 1,
  },
});

// populate user field with User model
const autoPopulateUser = function (next) {
  this.populate("user", "name email");
  next();
};

xpAndStreaksSchema.pre("find", autoPopulateUser);
xpAndStreaksSchema.pre("findOne", autoPopulateUser);

const xpAndStreaks = mongoose.model("xpAndStreaks", xpAndStreaksSchema);

module.exports = xpAndStreaks;
