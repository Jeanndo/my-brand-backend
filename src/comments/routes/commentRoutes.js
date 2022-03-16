import express from "express"
import * as commentsController from "./../controllers/commentsControllers.js"
import * as middlewares from "../../middlewares/middleware.js"

const router = express.Router({ mergeParams: true })

router
  .route("/")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    commentsController.getAllComments
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    middlewares.setBlogCommentIds,
    commentsController.createComment
  )
router
  .route("/:id")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    commentsController.getComment
  )
  .patch(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    commentsController.updateComment
  )
  .delete(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    commentsController.deleteComment
  )

export default router
