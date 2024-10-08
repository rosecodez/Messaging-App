const request = require("supertest");
const app = require("../app.js");
const { expect } = require("chai");

let agent = request.agent(app);
describe("GET /users/get-all-contacts", () => {
  before((done) => {
    agent
      .post("/users/log-in")
      .send({ username: "cristinaqwe", password: "qweasdzxcqweasdzxc" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return a 200 status and a json response with a 'contacts' array of objects", (done) => {
    agent
      .get("/users/get-all-contacts")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
