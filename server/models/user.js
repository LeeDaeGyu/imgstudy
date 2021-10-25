const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, require: true, unique: true },
    hashedPassword: { type: String, required: true }
  },
  { timestamps: true }
);

const userCollection = model("userCollection", userSchema);

module.exports = userCollection;
