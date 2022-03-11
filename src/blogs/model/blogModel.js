// @ts-nocheck
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog should have a Title"],
    },
    blogImage: {
      type: String,
      required: [true, "A blog should have an descriptoive image "],
    },
    description: {
      type: String,
      required: [true, "A blog should have a description"],
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
