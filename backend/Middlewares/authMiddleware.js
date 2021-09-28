const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  console.log("authmiddle", req.headers);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ","");
  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    req.token = token;
    next();
  });
};
