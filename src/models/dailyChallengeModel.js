const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema({
  challenge_name: {
    type: String,
    required: [true, "Challenge name is required"],
  },
  xp_reward: {
    type: Number,
    required: [true, "XP reward is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const DailyChallenge = mongoose.model("DailyChallenge", dailyChallengeSchema);

module.exports = DailyChallenge;
