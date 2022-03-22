// @ts-nocheck
import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config({ path: "./../../config.env" })

cloudinary.v2.config({
  cloud_name: "dsb0gu6km",
  api_key: "145316382792157",
  api_secret: "Q-rZTfIgJkiVZzSQnLHxFIbbxnM",
})

export default cloudinary
