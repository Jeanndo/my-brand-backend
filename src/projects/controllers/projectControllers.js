import Project from "./../models/projectModel.js"
import * as Factory from "./../../handlerFactory/handlerFactory.js"

export const createProject = Factory.createOne(Project, "Project")
export const getAllProjects = Factory.getAll(Project)
export const getProject = Factory.getOne(Project)
export const updateProject = Factory.updateOne(Project)
export const deleteProject = Factory.deleteOne(Project, "Project")
