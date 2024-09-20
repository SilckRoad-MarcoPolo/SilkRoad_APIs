const Badge = require("../src/models/badgeModel");
const runModelTests = require("./MAINTESTS");

// Function to get valid badge test data
const getBadgeTestData = () => ({
  badge_name: "Test Badge",
  badge_icon: "test.png",
  badge_description: "This is a test badge",
  requirements: "Complete the test",
});

// Function to get invalid badge test data
const getInvalidBadgeData = () => ({
  badge_name: "",
  badge_icon: "invalid.png",
  badge_description: "This is an invalid badge",
  requirements: "Complete the invalid test",
});

describe("Badge Routes", () => {
  runModelTests(Badge, "/api/v1/badges", getBadgeTestData, getInvalidBadgeData);
});
