// @ts-nocheck
import mongoose from "mongoose"
import multer from "multer"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog should have a Title"],
    },
    blogImage: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "A blog should have a description"],
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
    author: {
      type: String,
    },
    likes: [String],
    disLikes: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "blog",
  localField: "_id",
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
