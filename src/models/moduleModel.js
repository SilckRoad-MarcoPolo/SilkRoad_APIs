const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    track_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: [true, "Track ID is required"],
    },
    module_name: { type: String, required: [true, "Module name is required"] },
    content_url: {
      type: String,
      required: [true, "Content URL is required"],
    },
    estimated_duration: {
      type: Date,
      required: [true, "Estimated duration is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populate the track_id field with track name and difficulty level
const autoPopulateTrack = function (next) {
  this.populate({ path: "track_id", select: "track_name difficulty_level" });
  next();
};

moduleSchema.pre("find", autoPopulateTrack);
moduleSchema.pre("findOne", autoPopulateTrack);

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
