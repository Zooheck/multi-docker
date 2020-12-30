const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
};
