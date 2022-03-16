import mongoose from "mongoose"

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required !"],
    trim: true,
  },
})

const SubScriber = mongoose.model("SubScriber", subscriberSchema)

export default SubScriber
