const request = require("supertest");
const app = require("../app.js");
const { expect } = require("chai");
const path = require("path");
require("dotenv").config();
let agent = request.agent(app);

const userId = process.env.USER_ID;
const conversationId = process.env.CONVERSATION_ID;
const testImage = path.join(__dirname, "assets", "test_image.jpeg");

// so far I have only tested 200 responses, I could also test the 400, 500s responses as well,
// if i am missing data that the request needs
// before tests, log in user

//login
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

describe("messages routes", () => {
  const textMessage = "hello!";
  describe("POST /messages/new-message", () => {
    it("should return a 201 status and a json response with a new message", (done) => {
      agent
        .post("/messages/new-message")
        .send({ text: textMessage, conversationId: conversationId })
        .set("Content-Type", "application/json")
        .expect(201)

        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property("text").that.equals("hello!");
          expect(res.body)
            .to.have.property("conversationId")
            .that.equals(conversationId);
          expect(res.body).to.have.property("userId").that.is.a("string");
          expect(res.body).to.have.property("conversation").that.an("object");
          expect(res.body).to.have.property("user").that.is.an("object");
          expect(res.body.user)
            .to.have.property("username")
            .that.is.a("string");

          done();
        });
    });
  });
});

//logout
after((done) => {
  agent
    .post("/users/log-out")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body)
        .to.have.property("message")
        .that.equals("Logged out successfully");

      // check if session is destroyed by accessing a protected route from the outside
      agent
        .get("/users/profile")
        .expect(401)
        .end((err2, res2) => {
          if (err2) return done(err2);

          expect(res2.body)
            .to.have.property("message")
            .that.equals("Unauthorized, please log in.");
          done();
        });
    });
});
