import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id)

    if (!doc) return next(new AppError("No document with that ID", 404))
    res.status(204).json({
      status: "success",
      message: "document deleted successfully ",
      data: null,
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

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)
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

    const index = doc.likes.findIndex((id) => id === req.user._id)

    if (index === -1) {
      doc.likes.push(req.user._id)
    } else {
      doc.likes = doc.likes.filter((id) => id !== String(req.user._id))
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

    const index = doc.disLikes.findIndex((id) => id === req.user._id)

    if (index === -1) {
      doc.disLikes.push(req.user._id)
    } else {
      doc.disLikes = doc.disLikes.filter((id) => id !== String(req.user._id))
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
