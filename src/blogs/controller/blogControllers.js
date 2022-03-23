import Blog from "./../model/blogModel.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const createBlog = Factory.createOne(Blog, "Blog")
export const getBlog = Factory.getOne(Blog, { path: "comments" })
export const getAllBlogs = Factory.getAll(Blog)
export const updateBlog = Factory.updateOne(Blog)
export const deleteBlog = Factory.deleteOne(Blog, "Blog")
export const likeBlog = Factory.Like(Blog)
export const disLikeBlog = Factory.Dislike(Blog)
