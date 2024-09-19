const globalErrorProd = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.error("ERROR: ", err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational
      ? err.message
      : "Something went wrong! Please try again later.",
  });
};

module.exports = globalErrorProd;
