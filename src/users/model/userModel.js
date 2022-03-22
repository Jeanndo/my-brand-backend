// @ts-nocheck
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your First Name Please !"],
  },
  lastName: {
    type: String,
    required: [true, "Your Last Name Please !"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Your Email Please!"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Your Password Please!"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please  confirm Your Password !"],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords are not matching",
    },
  },
  cloudinary_Id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
})

// Encryptoing password and Deleting confrimpassword field

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next()
})

// Instance Methods // Checking if password is correct.

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

//  Instance methods // Check if user changed password

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimestamp
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

const User = mongoose.model("User", userSchema)

export default User
