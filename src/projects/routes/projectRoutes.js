import express from "express"
import * as projectController from "./../controllers/projectControllers.js"
import * as middlewares from "../../middlewares/middleware.js"
import multer, { diskStorage } from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/")
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname)
  },
})
const upload = multer({ storage: storage })

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
