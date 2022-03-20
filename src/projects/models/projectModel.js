import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Project should have a Name"],
  },
  projectImage: {
    type: String,
    required: [true, "A project should have an descriptive image "],
  },
  price: {
    type: Number,
    required: [true, "A project should have a price"],
  },
  link: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
})

const Project = mongoose.model("Project", projectSchema)

export default Project
