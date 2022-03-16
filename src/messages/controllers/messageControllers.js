import Message from "./../model/messageModel.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const createMessage = Factory.createOne(Message)
export const getAllMessages = Factory.getAll(Message)
export const getMessage = Factory.getOne(Message)
export const updateMessage = Factory.updateOne(Message)
export const deleteMessage = Factory.deleteOne(Message)
