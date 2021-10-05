const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true }
  },
  { timestamps: true }
);

const ImageCollection = mongoose.model("ImageCollection", ImageSchema);

module.exports = { ImageCollection };
