const express = require("express");
const routes = express.Router();
const URLMapping = require("./urlSchema");

const api = window.location.href.includes("localhost")
  ? "http://localhost:3001/"
  : "https://tiny-url-backend.herokuapp.com/";

const convertToBase62 = (num) => {
  let base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  while (num > 0) {
    result = base62[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
};

routes.route("/:id").get(async function (req, res) {
  const id = req.params.id;
  URLMapping.findOne({ urlID: id }).then((url) => {
    if (url) {
      res.status(200).send(url.url);
    } else {
      res.status(200).send("none");
    }
  });
});

routes.route("/").post(async function (req, res) {
  let url = req.body.url;
  const urlObject = await URLMapping.findOne({ url: url }).exec();
  if (urlObject) {
    res.status(200).send(api + urlObject.urlID);
  } else {
    const count = await URLMapping.countDocuments();
    const urlID = convertToBase62(count);
    if (!url.includes("http://") && !url.includes("https://")) {
      url = "https://" + url;
    }
    const resp = await URLMapping.create({ url: url, urlID: urlID });
    res.status(200).send(api + resp.urlID);
  }
});

module.exports = routes;
