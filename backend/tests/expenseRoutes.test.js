const request = require("supertest");
const app = require("../app");

describe("Expense Routes", () => {
  test("GET /api/expenses - It should respond with all expenses", async () => {
    const response = await request(app)
      .get("/api/expenses")
      .set("X-BypassAuth", "true");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
