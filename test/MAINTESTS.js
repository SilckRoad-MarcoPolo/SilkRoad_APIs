const request = require("supertest");
const app = require("../server");
const dbConnection = require("../src/config/db");
const mongoose = require("mongoose");
require("dotenv").config();

const runModelTests = (model, endpoint, getTestData, getInvalidData) => {
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

  // TEST: Retrieve all entries
  it("should retrieve all entries", async () => {
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  // TEST: Retrieve an entry by ID
  it("should retrieve an entry by ID", async () => {
    const response = await request(app).get(`${endpoint}/${testId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  // TEST: Create a new entry
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

  // TEST: Update an entry
  it("should update an entry (admin only)", async () => {
    const updatedEntryData = getTestData();

    // Dynamically choose the first updatable field
    const fields = Object.keys(updatedEntryData);
    if (fields.length > 0) {
      updatedEntryData[fields[0]] = "Updated Value";
    }

    const response = await request(app)
      .patch(`${endpoint}/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedEntryData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  // TEST: Delete an entry
  it("should delete an entry (admin only)", async () => {
    const response = await request(app)
      .delete(`${endpoint}/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    console.log(JSON.stringify("The entry has been deleted", null, 2));
  });

  // TEST: Create an entry with invalid data
  it("should not create an entry with invalid data", async () => {
    const invalidData = getInvalidData();

    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(invalidData);

    expect(response.status).toBe(422);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });

  // TEST: Update an entry with invalid data
  it("should not update an entry with invalid data", async () => {
    const invalidData = getInvalidData();

    const response = await request(app)
      .patch(`${endpoint}/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(invalidData);

    expect(response.status).toBe(422);
    expect(response.body).toBeDefined();
    console.log(JSON.stringify(response.body, null, 2));
  });
};

module.exports = runModelTests;
