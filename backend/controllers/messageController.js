const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.conversation_post = asyncHandler(async (req, res, next) => {
  const user = req.session.user;
  const participants = req.body.participantIds;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!participants) {
    return res.status(400).json({ message: "Participants not found" });
  }

  const userId = user.id;
  try {
    // check if an existing conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: participants.concat(userId),
            },
          },
        },
      },
      // retrieve users and their messages if it exists
      include: {
        participants: true,
        messages: true,
      },
    });

    if (existingConversation) {
      return res.status(200).json({ conversation: existingConversation });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: participants.map((id) => ({ id })).concat({ id: userId }),
        },
      },
      include: {
        participants: true,
      },
    });

    return res.status(201).json({ conversation: newConversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the conversation." });
  }
});
