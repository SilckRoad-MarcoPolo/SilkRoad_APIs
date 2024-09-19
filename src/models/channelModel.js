const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},{
  timestamps: true,
  versionKey: false
});

// Populate members field
channelSchema.pre("find", function () {
  this.populate("members", "name email");
});

module.exports = mongoose.model("Channel", channelSchema);
