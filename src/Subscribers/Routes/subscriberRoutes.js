import express from "express"
import * as subScriber from "./../controller/SubscribeController.js"

const router = express.Router()

router.route("/").get(subScriber.getAllSubscribers).post(subScriber.subScribe)
router.route("/:id").delete(subScriber.unSubscribe)

export default router
