require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const { imageRouter } = require("./router/imageRouter");
const { userRouter } = require("./router/userRouter");
const app = express();
const { MONGO_URI, PORT } = process.env;
const { authenticate } = require("./middleware/authentication");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb is connected");

    app.use(express.json());
    app.use(authenticate);
    app.use("/uploads", express.static("uploads"));
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT, () => {
      console.log("Express Server listening on PORT " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
