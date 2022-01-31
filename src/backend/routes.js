const express = require("express");
const routes = express.Router();
const URLMapping = require("./urlSchema");

routes.route("/").get(async function (req, res) {
  res.send("Hello World!");
});

routes.route("/").post(async function (req, res) {
  console.log("success");
  const url = req.body.url;
  // TODO: check if url is null
  URLMapping.countDocuments().then((count) => {
    console.log(count);
    URLMapping.create({}).then((resp) => {
      res.status(200).send(count + 1);
    });
  });
});

module.exports = routes;
