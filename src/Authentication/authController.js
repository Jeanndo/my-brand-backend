// @ts-nocheck
import User from "./../users/model/userModel.js"
import jwt from "jsonwebtoken"
import { promisify } from "util"
import AppError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"
import sendEmail from "../utils/email.js"

// SIGN TOKEN

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Signup user

export const signup = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email: email })

  if (user) {
    return next(
      new AppError("User Already exist, Please use different Account", 401)
    )
  }

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  })

  const token = signToken(newUser._id)
  res.status(201).json({
    status: "success",
    message: `${newUser.firstName} Registered successfuly `,
    data: {
      user: newUser,
    },
  })
})

// Login User

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401))
  }

  const token = signToken(user._id)
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  })
})

export const forgotPassword = catchAsync(async (req, res, next) => {
  // Get user email
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new AppError("There is not user with that email address", 404))
  }
  // Generate the random token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  // send it to user's email

  const resetURL = `{req.protocal}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password? Please follow instructions to reset your password to:${resetURL}.\n If you didn't forgot your password please ignore this email`

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token valid for ten min",
      message,
    })

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(new AppError("Error while sending email", 500))
  }
})
export const resetPassword = (req, res, next) => {}
