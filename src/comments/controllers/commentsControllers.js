import Comment from "./../model/commentsModel.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const createComment = Factory.createOne(Comment)
export const getAllComments = Factory.getAll(Comment)
export const getComment = Factory.getOne(Comment)
export const updateComment = Factory.updateOne(Comment)
export const deleteComment = Factory.deleteOne(Comment)
