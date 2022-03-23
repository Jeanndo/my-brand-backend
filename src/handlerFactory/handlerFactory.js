// @ts-nocheck
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import cloudinary from "./../utils/cloudinary.js"
import path from "path"

export const deleteOne = (Model, specificModel) =>
  catchAsync(async (req, res, next) => {
    let doc
    if (specificModel === "Blog" || specificModel === "Project") {
      doc = await Model.findByIdAndRemove(req.params.id)
      await cloudinary.uploader.destroy(doc.cloudinary_Id)
    } else {
      doc = await Model.findByIdAndRemove(req.params.id)
    }

    if (!doc) return next(new AppError("No document with that ID", 404))
    res.status(200).json({
      status: "success",
      message: "document deleted successfully 👍🏾 ",
    })
  })

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) return next(new AppError("No document with that ID", 404))

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

export const createOne = (Model, specialModel) =>
  catchAsync(async (req, res, next) => {
    let doc

    if (specialModel === "Blog") {
      const result = await cloudinary.uploader.upload(req.file.path)
      doc = await Model.create({
        title: req.body.title,
        blogImage: result.secure_url,
        description: req.body.description,
        cloudinary_Id: result.public_id,
        author: req.user.firstName,
      })
    } else if (specialModel === "Project") {
      const result = await cloudinary.uploader.upload(req.file.path)
      doc = await Model.create({
        name: req.body.name,
        projectImage: result.secure_url,
        price: req.body.price,
        link: req.user.link,
        cloudinary_Id: result.public_id,
      })
    } else {
      doc = await Model.create(req.body)
    }
    console.log("doc", doc)
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query

    if (!doc) return next(new AppError("No blog with that ID", 404))

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Only for Nested Routes like Blogs and Comments

    let filter = {}
    if (req.params.blogId) filter = { blog: req.params.blogId }

    const docs = await Model.find(filter)

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    })
  })

export const Like = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.user) return next(new AppError("Please Login First 😊", 401))

    const doc = await Model.findById(req.params.id)
    if (!doc) return next(new AppError("No blog with that ID", 404))

    const index = doc.likes.findIndex((id) => id === req.user.id)

    if (index === -1) {
      doc.likes.push(req.user._id)
    } else {
      doc.likes = doc.likes.filter((id) => id !== req.user.id)
    }
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, doc, {
      new: true,
    })

    res.status(200).json({
      status: "success",
      data: {
        data: updatedDoc,
      },
    })
  })

export const Dislike = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.user) return next(new AppError("Please Login First 😊", 401))

    const doc = await Model.findById(req.params.id)
    if (!doc) return next(new AppError("No blog with that ID", 404))

    const index = doc.disLikes.findIndex((id) => id === req.user.id)

    if (index === -1) {
      doc.disLikes.push(req.user._id)
    } else {
      doc.disLikes = doc.disLikes.filter((id) => id !== req.user.id)
    }
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, doc, {
      new: true,
    })

    res.status(200).json({
      status: "success",
      data: {
        blog: updatedDoc,
      },
    })
  })

export const subscribe = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email } = req.body
    const doc = await Model.findOne({ email: email })
    if (doc)
      return next(
        new AppError("You had Already Subscribed to the news Letter", 400)
      )
    const NewSubscribed = await Model.create({
      email: req.body.email,
    })

    res.status(200).json({
      status: "success",
      data: {
        data: NewSubscribed,
      },
    })
  })
