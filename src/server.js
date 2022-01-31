const express = require("express");
const cors = require("cors");
const dbo = require("./backend/db");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./backend/routes"));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send(err);
});

// perform a database connection when the server starts
dbo.connectToServer();

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
