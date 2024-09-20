const request = require("supertest");
const app = require("../server");
const dbConnection = require("../src/config/db");
const mongoose = require("mongoose");
require("dotenv").config();

describe("Auth Routes", () => {
  beforeAll(async () => {
    await dbConnection();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/v1/auth/signup", () => {
    it("should signup a new user", async () => {
      const signupData = {
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123",
        photo: "https://example.com/photo.jpg",
        name: "Test User",
      };

      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(signupData);

      console.log(response.body);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toBeDefined();
      expect(response.body.token).toBeDefined();
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login a user", async () => {
      const loginData = {
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toBeDefined();
      expect(response.body.token).toBeDefined();
    });
  });
});
