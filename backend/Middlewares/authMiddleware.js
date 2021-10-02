const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blacklist = require('../models/blacklist');
const { ACCESS_TOKEN_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ","");

  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    const userBlacklist = await Blacklist.find({ token, user: user._id });
    if (userBlacklist.length > 0) {
      res.status(402).send({ error: 'Invalid token' });
      return;
    }
    if(!user) return res.status(422).send({error: 'Could not find an existing account'})
    req.user = user;
    req.token = token;
    next();
  });
};
