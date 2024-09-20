const mongoose = require("mongoose");
const User = require("./userModel");

const mentorSchema = new mongoose.Schema(
  {
    experience_years: { type: Number, required: true },
    specialization: { type: String, required: true },
    contact_info: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Mentor = User.discriminator("Mentor", mentorSchema);

module.exports = Mentor;
