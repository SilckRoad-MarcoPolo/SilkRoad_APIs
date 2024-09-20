const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  badge_name: {
    type: String,
    required: [true, "Badge name is required"],
  },
  badge_icon: {
    type: String,
    required: [true, "Badge image is required"],
  },
  badge_description: {
    type: String,
    required: [true, "Badge description is required"],
  },
  requirmenets: {
    type: String
  },
},{
  timestamps: true,
  versionKey: false,
});

const badge = mongoose.model("badge", badgeSchema);

module.exports = badge;
