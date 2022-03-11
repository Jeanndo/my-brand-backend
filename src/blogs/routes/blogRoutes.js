// @ts-nocheck
import express from "express"
import * as blogController from "./../controller/blogControllers.js"
import commentRouter from "./../../comments/routes/commentRoutes.js"
import * as middlewares from "./../../middlewares/middleware.js"

const router = express.Router()

router.patch("/like/:id", blogController.likeBlog)
router.patch("/dislike/:id", blogController.disLikeBlog)
router.use("/:blogId/comments", commentRouter)

router
  .route("/")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    blogController.getAllBlogs
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    blogController.createBlog
  )
router
  .route("/:id")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    blogController.getBlog
  )
  .patch(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    blogController.updateBlog
  )
  .delete(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    blogController.deleteBlog
  )

export default router
