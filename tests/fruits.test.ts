import httpStatus from "http-status";
import { app } from "index";
import { Fruit } from "repositories/fruits-repository";
import supertest from "supertest";

const server = supertest(app);

describe("GET /fruits", () => {
  it("should respond with fruits list", async () => {
    const response = await server.get("/fruits");
    const fruits: Fruit[] = [
      { id: 1, name: "Banana", price: 20 },
      { id: 2, name: "Maçã", price: 10 },
    ];
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toMatchObject(fruits);
  });
});

describe("GET /fruits/:id", () => {
  it("should respond with status 404 when id not found", async () => {
    const response = await server.get(`/fruits/156085498465165`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and the fruit", async () => {
    const response = await server.get("/fruits/1");
    const fruit: Fruit = { id: 1, name: "Banana", price: 20 };
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toMatchObject(fruit);
  });
});

describe("POST /fruits", () => {
  it("should respond with status 422 when body is invalid", async () => {
    const response = await server.post("/fruits");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 409 when fruit already exists", async () => {
    const response = await server
      .post("/fruits")
      .send({ name: "Banana", price: 20 });
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
  it("should return status 201 when successful", async () => {
    const response = await server
      .post("/fruits")
      .send({ name: "Melão", price: 25 });
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
