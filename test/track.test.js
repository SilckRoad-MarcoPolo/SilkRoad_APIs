const Track = require("../src/models/trackModel");
const runModelTests = require("./MAINTESTS");

// Function to get valid track test data
const getTrackTestData = () => ({
  track_name: "Test Track",
  difficulty_level: "easy",
  description: "This is a test track.",
});

// Function to get invalid track test data
const getInvalidTrackData = () => ({
  track_name: "",
  difficulty_level: "easy",
  description: "This is an invalid track.",
});

describe("Track Routes", () => {
  runModelTests(Track, "/api/v1/tracks", getTrackTestData, getInvalidTrackData);
});
