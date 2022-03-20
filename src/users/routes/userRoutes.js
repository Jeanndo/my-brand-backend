import express from "express"
import * as userController from "./../controllers/userController.js"
import * as authController from "./../../Authentication/authController.js"
import * as middlewares from "../../middlewares/middleware.js"

const router = express.Router()

// Auth Routes

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/forgotPassword", authController.forgotPassword)
router.patch("/resetPassword/:token", authController.resetPassword)

router
  .route("/")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    userController.getAllUser
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    userController.createUser
  )
router
  .route("/:id")
  .get(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    userController.getUser
  )
  .patch(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    middlewares.protect,
    middlewares.restrictTo("admin"),
    userController.deleteUser
  )

export default router
