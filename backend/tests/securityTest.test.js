// backend/tests/security.tests.js
const request = require("supertest");
const app = require("../app");

describe("Security Tests", () => {
  it("should prevent SQL injection attacks", async () => {
    const response = await request(app)
      .post("/api/expenses")
      .set("X-BypassAuth", "true")
      .send({ title: "'; DROP TABLE expenses; --", amount: 100 });

    expect(response.status).not.toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("should prevent XSS attacks", async () => {
    const response = await request(app)
      .post("/api/expenses")
      .set("X-BypassAuth", "true")
      .send({ title: "<script>alert('XSS');</script>", amount: 100 });

    expect(response.status).not.toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("should ensure proper authorization", async () => {
    const response = await request(app)
      .get("/api/expenses")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Token is not valid");
  });
});
