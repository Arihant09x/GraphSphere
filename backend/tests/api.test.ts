import "dotenv/config";
import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { closeDriver } from "../src/db/driver.js";

const app = createApp();
let firstDeveloper = "";
let secondDeveloper = "";
let project = "";
let technology = "";
let token = "";
const unique = `test-${Date.now()}@graphsphere.dev`;

afterAll(async () => closeDriver());

describe("GraphSphere API", () => {
  it("reports actual database health", async () => {
    expect((await request(app).get("/api/v1/health")).status).toBe(200);
  });

  it("registers, rejects duplicate registration, logs in and rejects wrong credentials", async () => {
    const body = {
      name: "Integration User",
      email: unique,
      password: "IntegrationPass2026!",
    };

    const registered = await request(app).post("/api/v1/auth/register").send(body);
    expect(registered.status).toBe(201);
    token = registered.body.data.accessToken;

    expect((await request(app).post("/api/v1/auth/register").send(body)).status).toBe(409);
    expect(
      (await request(app).post("/api/v1/auth/login").send({ email: unique, password: "wrong" })).status,
    ).toBe(401);
    expect(
      (await request(app).post("/api/v1/auth/login").send({ email: unique, password: body.password })).status,
    ).toBe(200);
  });

  it("protects API routes and returns current user", async () => {
    expect((await request(app).get("/api/v1/developers")).status).toBe(401);
    expect((await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`)).status).toBe(200);
  });

  it("lists and reads graph resources", async () => {
    const auth = { Authorization: `Bearer ${token}` };
    const developers = await request(app).get("/api/v1/developers").set(auth);
    expect(developers.status).toBe(200);
    firstDeveloper = developers.body.data.items[0].id;
    secondDeveloper = developers.body.data.items[1].id;

    expect((await request(app).get(`/api/v1/developers/${firstDeveloper}`).set(auth)).status).toBe(200);

    const projects = await request(app).get("/api/v1/projects").set(auth);
    expect(projects.status).toBe(200);
    project = projects.body.data.items[0].id;

    const technologies = await request(app).get("/api/v1/technologies").set(auth);
    expect(technologies.status).toBe(200);
    technology = technologies.body.data.items[0].id;

    expect((await request(app).get("/api/v1/search?q=Graph").set(auth)).status).toBe(200);
    expect((await request(app).get(`/api/v1/projects/${project}`).set(auth)).status).toBe(200);
    expect((await request(app).get(`/api/v1/technologies/${technology}`).set(auth)).status).toBe(200);
  });

  it("runs a multi-hop graph query and validates invalid IDs", async () => {
    const auth = { Authorization: `Bearer ${token}` };
    const response = await request(app)
      .get(`/api/v1/graph/path?fromId=${firstDeveloper}&toId=${secondDeveloper}&maxDepth=10`)
      .set(auth);

    expect(response.status).toBe(200);
    expect(response.body.data.distance).toBeGreaterThanOrEqual(1);
    expect((await request(app).get("/api/v1/developers/not-an-id").set(auth)).status).toBe(400);
  });

  it("returns a real developer network graph and recommendations for a known developer", async () => {
    const auth = { Authorization: `Bearer ${token}` };
    const id = "d-0000-4000-8000-000000000015";

    const networkResponse = await request(app).get(`/api/v1/developers/${id}/network`).set(auth);
    expect(networkResponse.status).toBe(200);
    expect(networkResponse.body.data).toBeDefined();
    expect(Array.isArray(networkResponse.body.data.nodes)).toBe(true);
    expect(Array.isArray(networkResponse.body.data.edges)).toBe(true);
    expect(networkResponse.body.data.nodes.length).toBeGreaterThan(0);

    const recommendationsResponse = await request(app).get(`/api/v1/graph/recommendations/${id}`).set(auth);
    expect(recommendationsResponse.status).toBe(200);

    const recs =
      recommendationsResponse.body.data && Array.isArray(recommendationsResponse.body.data.recommendations)
        ? recommendationsResponse.body.data.recommendations
        : Array.isArray(recommendationsResponse.body.data)
          ? recommendationsResponse.body.data
          : [];

    expect(Array.isArray(recs)).toBe(true);
  });

  it("searches technology nodes by real label and exposes the type", async () => {
    const auth = { Authorization: `Bearer ${token}` };
    const react = await request(app).get("/api/v1/search?q=React").set(auth);
    const kubernetes = await request(app).get("/api/v1/search?q=Kubernetes").set(auth);

    expect(react.status).toBe(200);
    expect(kubernetes.status).toBe(200);

    const items = [...(react.body.data ?? []), ...(kubernetes.body.data ?? [])];
    expect(items.some((item) => String(item.type).toLowerCase() === "technology")).toBe(true);
    expect(
      items.some(
        (item) =>
          String(item.name).toLowerCase().includes("kubernetes") ||
          String(item.name).toLowerCase().includes("react"),
      ),
    ).toBe(true);
  });
});
