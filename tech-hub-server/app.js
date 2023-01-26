const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// CREATE THE EXPRESS APP
const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// SERVER ROOT ENDPOINT
app.get("/", (req, res) => {
  res.status(200).json({
    app: "Tech Hub",
    message: "Hello from the Tech Hub server!",
  });
});

// ROUTES MOUNTING
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} URL on the server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
