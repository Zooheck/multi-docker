const { Pool } = require("pg");
const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = require("../keys");

const pgClient = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  port: pgPort,
  password: pgPassword,
});

pgClient.on("connect", () => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log(err));
});

module.exports = {
  pgClient,
};
