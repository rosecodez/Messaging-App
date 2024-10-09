const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/multer");

//sign-up form
router.get("/sign-up", userController.user_signup_get);
router.post("/sign-up", userController.user_signup_post);

//log-in form, tested
router.get("/log-in", userController.user_login_get);
router.post("/log-in", userController.user_login_post);

//log-out, tested
router.post("/log-out", userController.user_logout_post);

// profile, tested
router.get("/profile", userController.user_profile_get);

// update profile picture,
router.post(
  "/update-profile-picture",
  upload.single("file"),
  userController.user_update_profile_picture
);

// get all contacts, tested
router.get("/get-all-contacts", userController.user_get_all_contacts);

// get contact by id, tested
router.get("/:userId/details", userController.user_get_contact_by_id);

// search user, tested
router.get("/search", userController.user_get_search);

module.exports = router;
