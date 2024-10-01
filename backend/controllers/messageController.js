const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const prisma = require("../prisma/prisma");

exports.conversation_post = asyncHandler(async (req, res, next) => {
  /* what do i want to display in the conversation?
    - first check if user is logged in, to handle the possible error
    messages from a conversation, between 2 users
    who are these users? 1->frontend(that we are fetching, "contactId" stores the id)
                                -> how will i use the id in frontend to access backend, so i need to send it somehow
                          2->backend(that we are logged in with -> req.user.session)
    ?how will the route look like
    -> conversation route to first check existing conversation or create a new one
        with:
            - participants [];
            - messages []; 
    -> how is this conversation created? what triggers it?
        - whenever we press Send, BUT it also creates a text, so basically when a text is created
    
    -> when are the conversations going to be display?
        = when we click on an user, we want to display the texts
    --> texts should be fetched with their user relationship, so i dont need to make another route
  */
  const loggedUser = req.session.user;
  const { userId } = req.body;

  if (!loggedUser) {
    return res.status(404).json({ message: "User not found. Log in please" });
  }

  try {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: [loggedUser.id, userId],
            },
          },
        },
      },
      include: { participants: true },
    });

    if (!existingConversation) {
      existingConversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: loggedUser.id }, { id: userId }],
          },
          messages: [],
        },
        include: { participants: true, messages: true },
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
