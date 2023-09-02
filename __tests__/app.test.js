// /Users/username/project-folder/__tests__/app.test.js
const request = require("supertest");
const db = require("../db/index");

const app = require("../app");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET api/treasure", () => {
  test("200 with ok message", () => {
    return request(app).get("/api/treasures").expect(200);
  });
  test("200 should iterate through treasures and check the keys and expect shop_id to be changed to shop name ", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        treasures.forEach((treasure) => {
          expect(treasure).toMatchObject({
            treasure_id: expect.any(Number),
            treasure_name: expect.any(String),
            colour: expect.any(String),
            age: expect.any(Number),
            cost_at_auction: expect.any(String),
            shop_name: expect.any(String),
          });
        });
      });
  });
  test("200 should return all treasure from DB ordered by treasure_age ascending ", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures).toBeSortedBy("age");
      });
  });
  test("200 should respond with a sorted array via the STRING cost_at_auction", () => {
    return request(app)
      .get("/api/treasures?sort_by=cost_at_auction")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        const costAtAuctionArray = treasures.map((treasure) =>
          Number(treasure.cost_at_auction)
        );
        expect(costAtAuctionArray).toBeSorted();
      });
  });
  test("200 should return all treasure from DB ordered by treasure_name ascending ", () => {
    return request(app)
      .get("/api/treasures?sort_by=treasure_name")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures).toBeSortedBy("treasure_name");
      });
  });
  test("404 should return an error message indicating invalid end point sort key from user input", () => {
    return request(app)
      .get("/api/treasures?sort_by=treasure_na")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort query");
      });
  });
  test("200 should return all treasure from DB ordered by treasure_age with user input deciding the order = descending ", () => {
    return request(app)
      .get("/api/treasures?order=desc")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures).toBeSortedBy("age", {
          descending: true,
        });
      });
  });
  test("404 should return an error message indicating invalid end point from user input order method", () => {
    return request(app)
      .get("/api/treasures?order=descending")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
  test("200 should return all treasures with the selected colour from the colour query", () => {
    return request(app)
      .get("/api/treasures?colour=gold")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        treasures.forEach((treasure) => {
          expect(treasure.colour).toBe("gold");
        });
      });
  });
  test("404 should respond with error if user inputs an invalid colour name", () => {
    return request(app)
      .get("/api/treasures?colour=785")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
});

describe("POST api/treasure", () => {
  const newTreasure = {
    treasure_name: "my comics",
    colour: "faded brown",
    age: 50,
    cost_at_auction: 167.34,
    shop_id: 3,
  };
  test("201 should return 200 on a valid post", () => {
    return request(app)
      .post("/api/treasures")
      .send(newTreasure)
      .expect(201)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures[0].treasure_name).toBe("my comics");
        expect(treasures[0].colour).toBe("faded brown");
        expect(treasures[0].age).toBe(50);
        expect(treasures[0].cost_at_auction).toBe("167.34");
        expect(treasures[0].shop_id).toBe(3);
      });
  });
});

describe("/api/treasures/:treasure_id", () => {
  test("should update the price of an item by treasure_id", () => {
    return request(app)
    .patch('/api/treasures/3?cost_at_auction=30.17')
    .expect(200)
    .then(({ body }) => {
      const { treasures } = body;
      expect(treasures[0].cost_at_auction).toBe("30.17");
      expect(treasures[0].treasure_id).toBe(3);
    });
  });
});
