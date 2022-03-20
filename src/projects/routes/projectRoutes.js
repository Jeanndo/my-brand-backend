import express from "express"
import * as projectController from "./../controllers/projectControllers.js"
import * as middlewares from "../../middlewares/middleware.js"

const router = express.Router()

router
  .route("/")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    projectController.getAllProjects
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    projectController.createProject
  )
router
  .route("/:id")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    projectController.getProject
  )
  .patch(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    projectController.updateProject
  )
  .delete(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    projectController.deleteProject
  )

export default router
