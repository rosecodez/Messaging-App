const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const prisma = require("../prisma/prisma");

exports.conversation_post = asyncHandler(async (req, res, next) => {
  const loggedUser = req.session.user;
  const { text, conversationId } = req.body;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!conversationId || !text) {
    return res
      .status(400)
      .json({ message: "conversationId or text not found" });
  }

  const userId = user.id;
  try {
    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });

    if (!existingConversation) {
      return res
        .status(404)
        .json({ message: "existingConversation not found" });
    }

    // new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        where: {
          participants: {
            connect: [{ id: loggedUser }, { id: userId }],
          },
        },
      },
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the message." });
  }
});

exports.new_message_post = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, please log in." });
    }

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Missing text" });
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        userId: user.id,
      },
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating new message:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating a new message." });
  }
});
