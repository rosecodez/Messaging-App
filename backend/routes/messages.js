const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/send-text", messageController.send_text);

module.exports = router;
