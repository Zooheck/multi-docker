const { pgClient } = require("./pgClient");
const { redisClient, redisPublisher } = require("./redisClient");

module.exports = {
  pgClient,
  redisClient,
  redisPublisher,
};
