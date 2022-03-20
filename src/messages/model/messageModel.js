import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Your Full Name Please !"],
  },

  email: {
    type: String,
    required: [true, "Your Email  Please!"],
  },
  subject: {
    type: String,
    required: [true, "Your Subject  Please!"],
  },
  message: {
    type: String,
    required: [true, "Your Message Please !"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Message = mongoose.model("Message", messageSchema)

export default Message
