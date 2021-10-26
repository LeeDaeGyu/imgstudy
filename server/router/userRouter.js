const { Router } = require("express");
const userRouter = Router();
const userCollection = require("../models/user");
const { hash, compare } = require("bcryptjs");

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
      sessionId: session._id,
      name: user.name
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
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
      name: getUser.name
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = { userRouter };
