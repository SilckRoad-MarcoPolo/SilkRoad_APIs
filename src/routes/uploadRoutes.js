const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../controllers/uploadController");
const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../controllers/authControllers");

// Route to handle avatar upload
router.post("/upload-photo", protect, upload.single("photo"), uploadPhoto);

module.exports = router;
