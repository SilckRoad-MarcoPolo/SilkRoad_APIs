const cloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");

// Controller function to handle avatar upload
async function uploadPhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await User.findById(req.user._id);
    user.photo = result.secure_url;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "photo uploaded successfully",
      photoUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res
      .status(500)
      .json({ message: "photo upload failed", error: error.message });
  }
}

module.exports = {
  uploadPhoto,
};
