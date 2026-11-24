#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
`;

async function main() {
  console.log("Seeding database...");
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!");
}

main();