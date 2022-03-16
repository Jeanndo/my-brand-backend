import mongoose from "mongoose"
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB)
  .then(() => console.log("DB connected Successful !! 🔥 "))
  .catch((error) => {
    console.log(error.stack)
  })
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}....`)
})
