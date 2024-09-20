const DailiChallenge = require("../src/models/dailyChallengeModel");
const runModelTests = require("./MAINTESTS");

// Function to get valid daily challenge test data
const getDailyChallengeTestData = () => ({
  challenge_name: "Test Challenge",
  xp_reward: 100,
  description: "This is a test challenge.",
  completed: false,
});

// Function to get invalid daily challenge test data
const getInvalidDailyChallengeData = () => ({
  challenge_name: "",
  xp_reward: 100,
  description: "This is an invalid challenge.",
  completed: false,
});

describe("Daily Challenge Routes", () => {
  runModelTests(
    DailiChallenge,
    "/api/v1/daily-challenges",
    getDailyChallengeTestData,
    getInvalidDailyChallengeData
  );
});
