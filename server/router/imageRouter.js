const { Router } = require("express");
const imageRouter = Router();
const { ImageCollection } = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

imageRouter.post("/", upload.single("image"), async (req, res) => {
  //유저 정보, public 유무 확인

  try {
    if (!req.user) throw new Error("권한이 없습니다.");

    const imgDoc = new ImageCollection({
      user: {
        _id: req.user.id,
        name: req.user.name,
        username: req.user.username
      },
      public: req.body.public,
      key: req.file.filename,
      originalFileName: req.file.originalname
    });
    await imgDoc.save();
    res.json(imgDoc);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: err.message });
  }
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
