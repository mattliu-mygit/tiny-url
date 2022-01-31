require("dotenv").config();
const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iym2h.mongodb.net/urlmappings?retryWrites=true&w=majority`;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let dbConnection;

module.exports = {
  connectToServer: async function () {
    await mongoose.connect(URI, option);
    //handle events emitted by the connection process
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });

    mongoose.connection.on("open", () => {
      console.log("Connected to MongoDB~");
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
