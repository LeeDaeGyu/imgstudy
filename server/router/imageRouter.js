const { Router } = require("express");
const imageRouter = Router();
const { ImageCollection } = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

imageRouter.post("/", upload.single("image"), async (req, res) => {
  //유저 정보, public 유무 확인
  const imgDoc = new ImageCollection({
    key: req.file.filename,
    originalFileName: req.file.originalname
  });
  await imgDoc.save();
  res.json(imgDoc);
});
imageRouter.get("/", async (req, res) => {
  // public 이미지들만 제공
  const getImgs = await ImageCollection.find();

  res.json(getImgs);
});

imageRouter.delete("/:imageId", (req, res) => {
  //유저 권한 확인
  //사진 삭제
});

imageRouter.patch("/:image/Like", (req, res) => {
  //유저 권한 확인
  //like 중복 안되도록 확인
});

imageRouter.patch("/:image/unike", (req, res) => {
  //유저 권한 확인
  //unlike 중복 안되도록 확인
});

module.exports = { imageRouter };
