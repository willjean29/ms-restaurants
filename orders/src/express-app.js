const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const { order, appEvents } = require("./api");
const HandleErrors = require("./utils/error-handler");
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));
module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // app.use((req, res, next) => {
  //   console.log(req);
  //   next();
  // });

  app.use("/document", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // listen to events
  appEvents(app);
  //api
  order(app);

  // error handling
  app.use(HandleErrors);
};
