const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${
    err.keyValue[Object.keys(err.keyPattern)[0]]
  }`;

  console.log(err);

  return new AppError(message, 400);
};

const handleValidationErrrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPord = (err, res) => {
  // For all operational error send the error message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);

    // For all unknown and programming errors send a generic error message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Send error on development
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);

    // Send error on production
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    // Handle cast errors
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    // Handle Duplicate key error
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    // Handle validation error
    if (err.name === "ValidationError") {
      error = handleValidationErrrorDb(error);
    }
    sendErrorPord(error, res);
  }
};
