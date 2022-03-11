import AppError from "../utils/appError.js"

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error, send message to clients

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
    // Progrmming errors or other unkown error do'nt leak error deails to clients
  } else {
    // log error
    console.error("Error 💥", err)

    // send a generic message to clients
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    })
  }
}

const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack)
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res)
  }
}

export default globalErrorHandler
