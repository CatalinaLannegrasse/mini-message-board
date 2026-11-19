# Mini Message Board

A lightweight message board built with **Node.js**, **Express**, and **EJS** as part of [The Odin Project’s NodeJS curriculum](https://www.theodinproject.com/). Users can view a conversation-style board of messages, post new messages via an HTML form, and open individual message details.

## Features

- **Message Feed (`GET /`)**: Displays messages with author name, message text, timestamp, and a link to open each message’s detail page.
- **New Message Form (`GET /new` & `POST /new`)**: Allows users to submit an author and message, parses form data via `express.urlencoded()`, appends the new message to the in-memory list, and redirects back to `/`.
- **Message Details (`GET /messages/:id`)**: Renders a dedicated view showing full details for a selected message.
- **WhatsApp-Inspired UI**: Styled with a static `public/styles.css` stylesheet featuring a chat header, subtle background pattern, and message bubbles.

## Notes

- Messages are stored in memory in `routes/indexRouter.js`, so adding or restarting the server resets the list back to the initial sample messages.