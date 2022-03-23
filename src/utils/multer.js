// @ts-nocheck
import multer from "multer"
import AppError from "./appError.js"
import path from "path"

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      cb(new AppError("file Type is not supported", 400), false)
      return
    }
    cb(null, true)
  },
})
