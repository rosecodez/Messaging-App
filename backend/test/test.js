const request = require("supertest");
const app = require("../app.js");
const { expect } = require("chai");
const path = require("path");
require("dotenv").config();
let agent = request.agent(app);

const userId = process.env.USER_ID;
const conversationId = process.env.CONVERSATION_ID;
const testImage = path.join(__dirname, "assets", "test_image.jpeg");

// before tests, log in user
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

  // get contact by id
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

  // search users
  describe("GET /users/search", () => {
    const search = "test";
    it("should return a 200 status and a JSON response with a 'users' objects array", (done) => {
      agent
        .get(`/users/search?search=${search}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.be.an("array");

          res.body.forEach((user) => {
            expect(user).to.have.property("id").that.is.a("string");
            expect(user).to.have.property("username").that.is.a("string");
            expect(user).to.have.property("profile").that.is.a("string");

            expect(user).to.not.have.property("password");
            expect(user).to.not.have.property("email");
            expect(user).to.not.have.property("createdAt");
          });

          done();
        });
    });
  });

  // update profile picture
  describe("POST /users/update-profile-picture", (done) => {
    it("should return a 200 status and a JSON response with a 'updatedUser object", (done) => {
      agent
        .post(`/users/update-profile-picture`)
        .expect(200)
        .attach("file", testImage)
        .expect("Content-Type", /json/)

        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message").that.is.a("string");
          expect(res.body).to.have.property("profileImage").that.is.a("string");

          done();
        });
    });
  });
});
