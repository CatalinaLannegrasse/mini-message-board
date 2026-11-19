const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;

  messages.push({
    id: nextId,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

indexRouter.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const message = messages.find((item) => item.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { title: "Message Details", message });
});

module.exports = indexRouter;