// @ts-nocheck
import catchAsync from "./../utils/catchAsync.js"
import User from "./../users/model/userModel.js"
import jwt from "jsonwebtoken"
import AppError from "./../utils/appError.js"
import { promisify } from "util"
import multer from "multer"

export const protect = catchAsync(async (req, res, next) => {
  let token

  // Get token and Check if is there.

  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  // console.log(token)

  if (!token) {
    return next(
      new AppError("You are not logged in Please login to have access", 401)
    )
  }

  //  Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE)
  console.log(decoded)
  // Check if User exist

  const freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return next(
      new AppError("The User belongs to this token does'nt exist", 401)
    )
  }

  req.user = freshUser

  next()
})

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not permitted to perform this action", 403)
      )
    }
    next()
  }
}

export const setBlogCommentIds = (req, res, next) => {
  // Nested Routes
  if (!req.body.blog) req.body.blog = req.params.blogId
  if (!req.body.author) req.body.author = req.user._id
  next()
}

export const uploadImage = (fileName) => {
  const upload = multer({ dest: "uploads/" })
  return upload.single(fileName)
}
