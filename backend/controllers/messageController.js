const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const prisma = require("../prisma/prisma");

exports.conversation_post = asyncHandler(async (req, res, next) => {
  const loggedUser = req.session.user;
  const { userId } = req.body;

  console.log("Received userId:", req.body.userId);
  if (!loggedUser) {
    return res.status(404).json({ message: "User not found. Log in please" });
  }

  try {
    let existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: [loggedUser.id, userId],
            },
          },
        },
      },

      include: {
        participants: true,
        messages: {
          include: {
            user: { select: { username: true } },
          },
        },
      },
    });

    if (!existingConversation) {
      existingConversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: loggedUser.id }, { id: userId }],
          },
        },
        include: {
          messages: {
            include: {
              user: { select: { username: true } },
            },
          },
          participants: true,
        },
      });
    }

    return res.status(201).json(existingConversation);
  } catch (error) {
    console.error("Error sending existingConversation:", error);
    return res.status(500).json({
      error: "An error occurred while sending the existingConversation.",
    });
  }
});

exports.new_message_post = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.body;
  try {
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
        conversationId: conversationId,
      },
      include: { conversation: true, user: { select: { username: true } } },
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating new message:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating a new message." });
  }
});
