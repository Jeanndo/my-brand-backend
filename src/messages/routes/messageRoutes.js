import express from "express"
import * as messageController from "./../controllers/messageControllers.js"
import * as middlewares from "../../middlewares/middleware.js"

const router = express.Router()

router
  .route("/")
  .get(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    messageController.getAllMessages
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    messageController.createMessage
  )
router
  .route("/:id")
  .get(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    messageController.getMessage
  )
  .patch(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    messageController.updateMessage
  )
  .delete(
    middlewares.protect,
    middlewares.restrictTo("user", "admin"),
    messageController.deleteMessage
  )

export default router
