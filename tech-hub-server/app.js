const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// CREATE THE EXPRESS APP
const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    app: "Tech Hub",
    message: "Hello from the Tech Hub server!",
  });
});

module.exports = app;
