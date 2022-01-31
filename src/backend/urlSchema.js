const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  urlID: String,
  url: String,
});

const URLMapping = mongoose.model("URLMapping", urlSchema);

module.exports = URLMapping;
