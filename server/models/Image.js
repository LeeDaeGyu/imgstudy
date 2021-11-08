const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Types.ObjectId, required: true, index: true },
      name: { type: String, required: true },
      username: { type: String }
    },
    likes: [{ type: mongoose.Types.ObjectId, required: true }],
    public: { type: Boolean, required: true, default: false },
    key: { type: String, required: true },
    originalFileName: { type: String, required: true }
  },
  { timestamps: true }
);

const ImageCollection = mongoose.model("ImageCollection", ImageSchema);

module.exports = { ImageCollection };
