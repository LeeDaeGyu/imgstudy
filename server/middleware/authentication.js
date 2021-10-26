const { isValidObjectId } = require("mongoose");
const userCollection = require("../models/user");

const authenticate = async (req, res, next) => {
  const {
    headers: { sessionid }
  } = req;
  if (!sessionid || !isValidObjectId(sessionid)) return next();
  const user = await userCollection.findOne({ "sessions._id": sessionid });
  if (!user) return next();
  req.user = user;
  next();
};

module.exports = { authenticate };
