const { Router } = require("express");
const imageRouter = Router();
const { ImageCollection } = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

imageRouter.post("/", upload.single("image"), async (req, res) => {
  const imgDoc = new ImageCollection({
    key: req.file.filename,
    originalFileName: req.file.originalname
  });
  await imgDoc.save();
  res.json(imgDoc);
});
imageRouter.get("/", async (req, res) => {
  const getImgs = await ImageCollection.find();

  res.json(getImgs);
});

module.exports = { imageRouter };
