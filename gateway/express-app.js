const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());

app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({ msg: "Service Gateway" });
// });

app.use("/store", proxy("http://store:8001"));
app.use("/recipe", proxy("http://recipe:8002"));
app.use("/orders", proxy("http://orders:8003"));

module.exports = app;
