// @ts-nocheck
import AppError from "./../utils/appError.js"

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}
const handleDUplicateFieldsDb = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
  const message = `Duplicate field value: ${value} please use another value`

  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input Data. ${errors.join(". ")}`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  //  Operational, trusted error, send message to clients

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    //Programming or other unknown error: don't leak error details to clients
  } else {
    //Send a generic message

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    })
  }
}

const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack)
  console.log("hi there", process.env.NODE_ENV)
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    let error = err
    console.log("extractedError:", error)
    console.log("errorName:", error.name)
    if (error.name === "CastError") error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDUplicateFieldsDb(error)
    if (error.name === "ValidationError") error = handleValidationErrorDB(error)
    sendErrorProd(error, res)
  }
}

export default globalErrorHandler
