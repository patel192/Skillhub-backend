const ResponseHandler = require("../utils/ResponseHandler");
const logger = require("../config/logger");

const handleCastError = (err) => {
  err.statusCode = 400;
  err.message = `Invalid ${err.path} : ${err.value}`;
  return err;
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  err.statusCode = 409;
  err.message = `${field} already exists`;
  return err;
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  err.statusCode = 400;
  err.message = errors.join(", ");
  return err;
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);

  return ResponseHandler.error(
    res,
    error.message || "Internal Server Error",
    error.statusCode || 500,
    error.env.NODE_ENV === "development" ? err.stack : null,
  );
};

module.exports = errorHandler;
