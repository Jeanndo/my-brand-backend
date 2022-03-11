import User from "./../model/userModel.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const createUser = Factory.createOne(User)
export const getAllUser = Factory.getAll(User)
export const getUser = Factory.getOne(User)
export const updateUser = Factory.updateOne(User)
export const deleteUser = Factory.deleteOne(User)
