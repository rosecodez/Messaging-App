const request = require("supertest");
const app = require("../app.js");
const { expect } = require("chai");
require("dotenv").config();
let agent = request.agent(app);

before((done) => {
  agent
    .post("/users/log-in")
    .send({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done();
    });
});

describe("users routes", () => {
  describe("GET /users/get-all-contacts", () => {
    it("should return a 200 status and a JSON response with a 'contacts' array of objects", (done) => {
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
});
