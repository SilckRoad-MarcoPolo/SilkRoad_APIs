const request = require("supertest");
const app = require("../server");
const dbConnection = require("../src/config/db");
const mongoose = require("mongoose");
require("dotenv").config();

const runModelTests = (model, endpoint, getTestData) => {
  let adminToken = process.env.ADMIN_TOKEN;
  let testId;

  beforeAll(async () => {
    await dbConnection();

    // Create a test entry using the provided test data function
    const testData = getTestData();
    const createdEntry = await model.create(testData);
    testId = createdEntry._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should retrieve all entries", async () => {
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("should retrieve an entry by ID", async () => {
    const response = await request(app).get(`${endpoint}/${testId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("should create a new entry (admin only)", async () => {
    const newEntryData = getTestData();

    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newEntryData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("should update an entry (admin only)", async () => {
    const updatedEntryData = getTestData();
    updatedEntryData.track_name = "Updated Test Track";

    const response = await request(app)
      .patch(`${endpoint}/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedEntryData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("should delete an entry (admin only)", async () => {
    const response = await request(app)
      .delete(`${endpoint}/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    console.log(JSON.stringify("The entry has been deleted", null, 2));
  });
};

module.exports = runModelTests;
