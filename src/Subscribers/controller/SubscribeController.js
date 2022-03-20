import SubScriber from "../model/Subscribers.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const subScribe = Factory.subscribe(SubScriber)
export const getAllSubscribers = Factory.getAll(SubScriber)
export const unSubscribe = Factory.deleteOne(SubScriber)
