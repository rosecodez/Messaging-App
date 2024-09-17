const express = require("express");
const router = express.Router();
const appController = require("../controllers/app-controller");

// get app
router.get("/", appController.app_get);

module.exports = router;
