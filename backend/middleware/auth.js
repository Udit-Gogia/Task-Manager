const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const auth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).send({
      err: "Please authenticate",
      msg: "Please authenticate to proceed",
      code: "noAuth",
    });
  }
};

module.exports = auth;
