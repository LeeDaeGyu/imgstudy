const { Router } = require("express");
const imageRouter = Router();
const { ImageCollection } = require("../models/Image");
const { upload } = require("../middleware/imageUpload");
const fs = require("fs");
const { promisify } = require("util");
const { isValidObjectId } = require("mongoose");
const fileUnlik = promisify(fs.unlink);
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
  const getImgs = await ImageCollection.find({ public: true });

  res.json(getImgs);
});

imageRouter.delete("/:imageId", async (req, res) => {
  //유저 권한 확인
  //사진 삭제
  // 사진 삭제 1. upload 폴더에서 2. 데이터베이스 폴더
  try {
    const {
      params: { imageId }
    } = req;
    console.log(imageId);
    if (!isValidObjectId(imageId))
      throw new Error("올바르지 않은 이미지 아이디입니다.");
    if (!req.user) throw new Error("권한이 없습니다.");
    const image = await ImageCollection.findOneAndDelete({ _id: imageId });
    if (!image) return res.json({ message: "이미 삭제된 이미지입니다." });
    await fileUnlik(`./uploads/${image.key}`);
    res.send({ message: "요청하신 이미지가 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

imageRouter.patch("/:imageId/like", async (req, res) => {
  //유저 권한 확인
  //like 중복 안되도록 확인
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    const {
      params: { imageId },
      user
    } = req;
    if (!isValidObjectId(imageId))
      throw new Error("잘못된 이미지 아이디입니다.");

    const image = await ImageCollection.findOneAndUpdate(
      { _id: imageId },
      { $addToSet: { likes: user.id } },
      { new: true }
    );

    res.send({ image });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

imageRouter.patch("/:imageId/unlike", async (req, res) => {
  //유저 권한 확인
  //unlike 중복 안되도록 확인
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    const {
      params: { imageId },
      user
    } = req;
    if (!isValidObjectId(imageId))
      throw new Error("잘못된 이미지 아이디입니다.");
    const image = await ImageCollection.findOneAndUpdate(
      { _id: imageId },
      { $pull: { likes: user.id } },
      { new: true }
    );
    res.send({ image });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { imageRouter };
