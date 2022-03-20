// @ts-nocheck
import mongoose from "mongoose"
import validator from "validator"

const commentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Your Comment please!"],
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: [true, "A comment must belong to a Blog"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A comment must belong to a Author"],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

commentsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "firstName lastName -_id",
  })
  next()
})
const Comment = mongoose.model("Comment", commentsSchema)

export default Comment
