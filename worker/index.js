const { redisHost, redisPort } = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

sub.on("message", (_, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");

function fib(index) {
  if (index < 2) {
    return 1;
  } else {
    return fib(index - 1) + fib(index - 2);
  }
}
