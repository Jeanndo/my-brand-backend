import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your First Name Please !"],
  },
  lastName: {
    type: String,
    required: [true, "Your Last Name Please !"],
  },
  email: {
    type: String,
    required: [true, "Your Email  Please!"],
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
