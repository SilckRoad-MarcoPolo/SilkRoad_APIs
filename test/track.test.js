const Track = require("../src/models/trackModel");
const runModelTests = require("./MAINTEST");

const getTrackTestData = () => ({
  track_name: "Test Track",
  difficulty_level: "easy",
  description: "This is a test track.",
});

describe("Track Routes", () => {
  runModelTests(Track, "/api/v1/tracks", getTrackTestData);
});
