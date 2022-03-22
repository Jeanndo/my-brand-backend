import express from "express"
import * as projectController from "./../controllers/projectControllers.js"
import * as middlewares from "../../middlewares/middleware.js"
import { upload } from "./../../utils/multer.js"

const router = express.Router()

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    upload.single("projectImage"),
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
