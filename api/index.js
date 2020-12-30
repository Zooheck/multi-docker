const { pgClient, redisClient, redisPublisher } = require("./clients");
const serverSetup = require("./serverSetup");

const express = require("express");
const app = express();
serverSetup(app);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const { index } = req.body;
  if (parseInt(index) > 40) {
    res.status(422).send("Index may not be greater than 40.");
  } else {
    redisClient.hset("values", index, "No value yet");
    redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
    res.send("Calculating index");
  }
});

app.listen(5000, () => {
  console.log("Server is listening");
});
