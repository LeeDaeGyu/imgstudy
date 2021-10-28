const { Router } = require("express");
const userRouter = Router();
const userCollection = require("../models/user");
const { hash, compare } = require("bcryptjs");
const { isValidObjectId } = require("mongoose");

userRouter.post("/register", async (req, res) => {
  try {
    const {
      body: { name, username, password }
    } = req;

    if (password.length < 5)
      throw new Error("비밀번호는 6자 이상으로 해야 됩니다.");
    if (username.length < 3)
      throw new Error("username 은 세자리 이상이어야 합니다.");
    const hashedPassword = await hash(password, 10);

    const user = new userCollection({
      name,
      username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }]
    });
    await user.save();

    const session = user.sessions[0];
    res.send({
      message: "user registered",
      userId: user.username,
      sessionId: session._id,
      usersname: user.name
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const {
      body: { password, username }
    } = req;

    const getUser = await userCollection.findOne({ username });
    const isValid = await compare(password, getUser.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
    getUser.sessions.push({ createdAt: new Date() });
    await getUser.save();
    const session = getUser.sessions[getUser.sessions.length - 1];
    res.send({
      message: "user validated",
      sessionId: session._id,
      name: getUser.name,
      userId: getUser.username
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    const {
      user,
      headers: { sessionid }
    } = req;
    console.log(user);
    if (!user) throw new Error("invalid sessionid");
    await userCollection.updateOne(
      { _id: user._id },
      {
        $pull: {
          sessions: {
            _id: sessionid
          }
        }
      }
    );
    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/me", (req, res) => {
  try {
    if (!req.user) throw new Error("권한이 없습니다.");

    res.json({
      message: "success",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      userId: req.user._id
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = { userRouter };
