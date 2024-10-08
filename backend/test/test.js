const request = require("supertest");
const app = require("../app.js");
const { expect } = require("chai");
require("dotenv").config();
let agent = request.agent(app);

const userId = process.env.USER_ID;
const conversationId = process.env.CONVERSATION_ID;
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
  //get all contacts
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

  // get profile
  describe("GET /users/profile", () => {
    it("should return a 200 status and a JSON response with a 'profile' object", (done) => {
      agent
        .get("/users/profile")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message").that.is.a("string");
          expect(res.body).to.have.property("user").that.is.an("object");

          const user = res.body.user;

          expect(user).to.have.property("id").that.is.a("string");
          expect(user).to.have.property("username").that.is.a("string");
          expect(user).to.have.property("profile").that.is.a("string");
          done();
        });
    });
  });

  describe("GET /users/:userId/details", () => {
    it("should return a 200 status and a JSON response with a 'contact' object by its id", (done) => {
      agent
        .get(`/users/${userId}/details?conversationId=${conversationId}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("user").that.is.an("object");

          const user = res.body.user;

          expect(user).to.have.property("id").that.is.a("string");
          expect(user).to.have.property("username").that.is.a("string");
          expect(user).to.have.property("profile").that.is.a("string");
          done();
        });
    });
  });
});
