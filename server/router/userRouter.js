const { Router } = require("express");
const userRouter = Router();
const userCollection = require("../models/user");

userRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new userCollection(req.body);
  await user.save();
  res.send({ user });
});

module.exports = { userRouter };
