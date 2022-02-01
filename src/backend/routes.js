const express = require("express");
const routes = express.Router();
const URLMapping = require("./urlSchema");

routes.route("/id/:id").get(async function (req, res) {
  const id = req.params.id;
  URLMapping.findOne({ urlID: id }).then((url) => {
    if (url) {
      res.status(200).send(url.url);
    } else {
      res.status(200).send("none");
    }
  });
});

routes.route("/url").get(async function (req, res) {
  const url = req.query.url;
  if (url)
    URLMapping.findOne({ url: url }).then((urlResp) => {
      if (urlResp) {
        res.status(200).send(urlResp.urlID);
      } else {
        res.status(200).send("none");
      }
    });
  else {
    res.status(400).send("url is required");
  }
});

routes.route("/").post(async function (req, res) {
  let url = req.body.url;
  let id = req.body.id;
  if (!url.includes("http://") && !url.includes("https://")) {
    url = "https://" + url;
  }
  const resp = await URLMapping.create({ url: url, urlID: id });
  res.status(200).send(resp.urlID);
});

module.exports = routes;
