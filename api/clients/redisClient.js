const redis = require("redis");
const { redisHost, redisPort } = require("../keys");

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

module.exports = {
  redisClient,
  redisPublisher,
};
