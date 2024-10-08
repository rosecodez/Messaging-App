const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/new-message", messageController.new_message_post);
router.post("/conversation", messageController.conversation_post);

module.exports = router;
