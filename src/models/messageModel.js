const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populate sender field and channel field
messageSchema.pre("find", function () {
  this.populate("sender", "name email").populate("channel");
});

module.exports = mongoose.model("Message", messageSchema);
