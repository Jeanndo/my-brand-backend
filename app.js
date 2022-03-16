import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import blogRouter from "./src/blogs/routes/blogRoutes.js"
import projectRouter from "./src/projects/routes/projectRoutes.js"
import userRouter from "./src/users/routes/userRoutes.js"
import messageRouter from "./src/messages/routes/messageRoutes.js"
import commentRouter from "./src/comments/routes/commentRoutes.js"
import subscribeRouter from "./src/Subscribers/Routes/subscriberRoutes.js"
import AppError from "./src/utils/appError.js"
import globalErrorHandler from "./src/errorControllers/errorController.js"

const app = express()
dotenv.config({ path: "./config.env" })
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

//  Welcome Route with a welcome message on my app

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from Codemoon",
  })
})

// App Routes midllewres

app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", messageRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscribe", subscribeRouter)

// Handling unhandled routes

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 400))
})

app.use(globalErrorHandler)
export default app
