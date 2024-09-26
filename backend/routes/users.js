const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/multer");

//sign-up form
router.get("/sign-up", userController.user_signup_get);
router.post("/sign-up", userController.user_signup_post);

//log-in form
router.get("/log-in", userController.user_login_get);
router.post("/log-in", userController.user_login_post);

//log-out
router.get("/log-out", userController.user_logout_get);

// profile
router.get("/profile", userController.user_profile_get);

// update profile picture
router.post(
  "/update-profile-picture",
  upload.single("file"),
  userController.user_update_profile_picture
);

// get all contacts
router.get("/get-all-contacts", userController.user_get_all_contacts);

// get contact by id
router.get("/:userId/details", userController.user_get_contact_by_id);

module.exports = router;
