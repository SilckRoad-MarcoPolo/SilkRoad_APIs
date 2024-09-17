const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populate the userId and mentorId fields with the name and email
const populateFields = function (next) {
  this.populate("userId", "name email").populate("mentorId", "name email");
  next();
};

appointmentSchema.pre("find", populateFields);
appointmentSchema.pre("findOne", populateFields);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
