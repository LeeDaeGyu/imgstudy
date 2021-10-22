require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const { imageRouter } = require("./router/imageRouter");

const app = express();
const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb is connected");
    app.use("/uploads", express.static("uploads"));
    app.use("/images", imageRouter);
    app.listen(PORT, () => {
      console.log("Express Server listening on PORT " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
