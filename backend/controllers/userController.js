const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const prisma = require("../prisma/prisma");

exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form");
});

exports.user_signup_post = [
  body("username", "Username must be specified and valid").trim().escape(),
  body("password", "Password must be specified and at least 10 characters long")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        errors: errors.array(),
        user: req.body,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
        },
      });

      req.login(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return next(err);
        }
        res.status(200).json({
          message: "Signup successful",
          user: { id: user.id, username: user.username },
        });
      });
    } catch (err) {
      console.error("Signup error details:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }
  }),
];

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form");
});

exports.user_login_post = [
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureFlash: false,
  }),
  asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;

      if (user) {
        req.session.userId = user.id;
        req.session.user = { id: user.id, username: user.username };

        console.log("Logged in user:", req.session.user);

        res.redirect("/drive");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (error) {
      next(error);
    }
  }),
];

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/log-in");
    });
  });
});

exports.user_profile_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.redirect("/log-in");
    }
    res.render("profile", { user });
  } catch (err) {
    return next(err);
  }
});
