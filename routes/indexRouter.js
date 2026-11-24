const { Router } = require("express");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const indexRouter = Router();

const validateMessage = [
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage("Author name is required.")
    .isLength({ max: 50 })
    .withMessage("Author name must be 50 characters or fewer."),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage("Message text cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Message must be 500 characters or fewer."),
];

indexRouter.get("/", async (req, res, next) => {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (err) {
    next(err);
  }
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {
    title: "New Message",
    errors: [],
    formData: { messageUser: "", messageText: "" },
  });
});

indexRouter.post("/new", validateMessage, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "New Message",
      errors: errors.array(),
      formData: req.body,
    });
  }

  try {
    const { messageUser, messageText } = matchedData(req);
    await db.insertMessage(messageUser, messageText);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

indexRouter.get("/messages/:id", async (req, res, next) => {
  try {
    const messageId = Number(req.params.id);
    if (Number.isNaN(messageId)) {
      return res.status(400).send("Invalid message ID");
    }

    const message = await db.getMessageById(messageId);
    if (!message) {
      return res.status(404).send("Message not found");
    }

    res.render("message", { title: "Message Details", message });
  } catch (err) {
    next(err);
  }
});

module.exports = indexRouter;