const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    track_name: { type: String, required: [true, "Track name is required"] },
    difficulty_level: {
      type: String,
      required: [true, "Difficulty level is required"],
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
