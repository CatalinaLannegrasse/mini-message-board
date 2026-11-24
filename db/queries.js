const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT id, username, text, added FROM messages ORDER BY added ASC"
  );
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT id, username, text, added FROM messages WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function insertMessage(username, text) {
  await pool.query(
    "INSERT INTO messages (username, text) VALUES ($1, $2)",
    [username, text]
  );
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessage,
};