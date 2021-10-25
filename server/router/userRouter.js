const { Router } = require("express");
const userRouter = Router();
const userCollection = require("../models/user");
const { hash } = require("bcryptjs");

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
    console.log(hashedPassword);
    const user = new userCollection({ name, username, hashedPassword });
    await user.save();
    res.send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { userRouter };
