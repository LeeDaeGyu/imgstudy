require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("invalid file type."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb is connected");
    app.use("/uploads", express.static("uploads"));
    app.post("/upload", upload.single("image"), (req, res) => {
      console.log(req.file);
      res.json(req.file);
    });
    app.listen(PORT, () => {
      console.log("Express Server listening on PORT " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
